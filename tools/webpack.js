const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mockProxyMiddleware = require('mock-proxy-middleware')
const mockCfgs = require('./mock-proxy')
const path = require('path')
const fs = require('fs')
let project
const port = 8890
const isHttps = false

const args = process.argv
const metaReg = /^\s*\/\*([\s\S]*?)\*\//m
const docKeyReg = /^[\s\*]*@(path|method|params|desc|type|headers)\s*([\s\S]+)$/gi
const descReg = /^\s*((["'])([^\2]+)\2|([^\s]+))\s*:\s*((['"])[^\6]+\6|[\s\S]*\/\/([^$]+))$/

if (args.length) {
  for (let i = 0; i < args.length; i++) {
    if (/^\-\-port=([^$]+)$/.test(args[i])) {
      port = RegExp.$1
    }
    if (/^\-\-project=([^$]+)$/.test(args[i])) {
      project = RegExp.$1
    }
  }
}

const getInternalIp = () => {
  const ifaces = os.networkInterfaces()
  let locatIp = 'localhost'
  for (let dev in ifaces) {
    for (let j = 0; j < ifaces[dev].length; j++) {
      let iface = ifaces[dev][j];
      if (iface.family === 'IPv4' && iface.address !== '127.0.0.1' && !iface.internal) {
        return iface.address
      }
    }
  }
}

const getIndexPage = () => {
  return `http${isHttps ? 's' : ''}://${getInternalIp()}:${port}/`
}

const parseMeta = (data) => {
  const meta = {
    method: 'get',
    type: 'json'
  }
  let dt = data
  let matched = true
  while (matched) {
    matched = false
    dt = dt.replace(metaReg, (all, contents) => {
      matched = true
      let lines = contents.split(/\n/)
      let paramsMap = {}
      let hasParamMap = false
      lines.forEach((line) => {
        line.replace(docKeyReg, (str, type, val) => {
          if (type === 'params') {
            if (/^\.([^\s]+)/.test(val)) {
              let key = RegExp.$1
              let columns = val.replace(/^\.([^\s]+)/, '').split(/\s*,\s*/)
              if (columns.length > 3) {
                columns[2] = columns.slice(2).join(',')
                columns.length = 3
              }
              paramsMap[key] = columns
              hasParamMap = true
              return
            }
          }
          meta[type] = val
        })
      })
      if (hasParamMap) {
        meta.paramsMap = paramsMap
      }
      return ''
    })
  }
  let respDescMap = {}
  dt.split(/\n/).forEach((line) => {
    if (descReg.test(line)) {
      if (RegExp.$7) {
        respDescMap[RegExp.$3 || RegExp.$4] = RegExp.$7
      }
    }
  })
  meta.respDescMap = respDescMap
  return meta
}

const findAPIs = (pathName) => {
  let arr = []
  fs.readdirSync(pathName).forEach((fileName) => {
    if (!/^\./.test(fileName)) {
      let filePath = path.join(pathName, fileName)
      if (fs.statSync(filePath).isDirectory()) {
        let apis = []
        let dir = {
          name: fileName,
          apis
        }
        arr.push(dir)
        fs.readdirSync(filePath).forEach((api) => {
          let data = fs.readFileSync(path.join(filePath, api), 'utf8')
          apis.push(parseMeta(data))
        })
      }
    }
  })
  return arr
}


let projects = []

mockCfgs.forEach((projectCfg) => {
  let pth = projectCfg.project
  if (project) {
    if (pth !== project) {
      return
    }
  }
  let rules = findAPIs(path.resolve(__dirname, '../mock/' + pth))
  projects.push({
    path: pth,
    rules
  })
})

const config = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.tpl'),
      templateParameters: projects
    })
  ],
  module: {
    rules: [
      {
        test: /\.tpl$/,
        use: {
          loader: 'simplite-loader'
        }
      }
    ]
  },
  cache: true,
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: port,
    publicPath: '',
    historyApiFallback: false,
    compress: true,
    https: isHttps,
    clientLogLevel: 'info',
    watchOptions: {
      ignored: [/\/node_modules\//, /\/mock\//]
    },
    open: 'Google Chrome',
    openPage: getIndexPage(),
    before: (app) => {
      app.use(mockProxyMiddleware(path.resolve(__dirname, './mock-proxy.js')))
    }
  }
}

module.exports = config