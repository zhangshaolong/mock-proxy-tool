const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mockProxyMiddleware = require('mock-proxy-middleware')
const cfg = require('./config')
const commander = require('child_process')
const path = require('path')
const fs = require('fs')
const isHttps = cfg.isHttps
const port = cfg.port
const mocks = cfg.mocks

const parseMeta = (data) => {
  const meta = {}
  data.replace(/^\s*(?:\<meta\>([\s\S]*?)<\/meta\>\s*)?/im, function (all, content) {
    if (!content) return
    let lines = content.split(/\n/)
    lines.forEach((line) => {
      line.replace(/^\s*@(path|method|params|desc)\s*([\s\S]+)$/gi, (str, type, val) => {
        meta[type] = val
      })
    })
  })
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
          apis.push({
            api: api.split('.')[0],
            meta: parseMeta(data)
          })
        })
      }
    }
  })
  return arr
}

let projects = []

mocks.forEach((projectCfg) => {
  let pth = projectCfg.project
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
    historyApiFallback: true,
    compress: true,
    https: isHttps,
    clientLogLevel: 'none',
    watchOptions: {
      ignored: [/\/node_modules\//, /\/mock\//]
    },
    before: (app) => {
      for (let i = 0; i < mocks.length; i++) {
        let mc = mocks[i]
        app.use(mockProxyMiddleware({
          apiConfig: {
            type: 'prefix',
            value: mc.rules
          },
          mockPath: 'mock/' + mc.project
        }))
      }
    },
    after: () => {
      const ifaces = os.networkInterfaces()
      let locatIp = 'localhost'
      for (let dev in ifaces) {
        for (let j = 0; j < ifaces[dev].length; j++) {
          if (ifaces[dev][j].family === 'IPv4') {
            locatIp = ifaces[dev][j].address
            break
          }
        }
      }
      let cmd
      if (process.platform == 'wind32') {
        cmd = 'start "%ProgramFiles%\Internet Explorer\iexplore.exe"'
      } else if (process.platform == 'linux') {
        cmd = 'xdg-open'
      } else if (process.platform == 'darwin') {
        cmd = 'open'
      }
      commander.exec(`${cmd} http${isHttps ? 's' : ''}://${locatIp}:${port}/`)
    }
  }
}

module.exports = config
