const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mockProxyMiddleware = require('mock-proxy-middleware')
const cfg = require('./config')
const commander = require('child_process')
const path = require('path')
const fs = require('fs')
const isHttps = cfg.isHttps
const port = cfg.port

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
          apis.push(api.split('.')[0])
        })
      }
    }
  })
  return arr
}

let apis = findAPIs(path.resolve(__dirname, '../mock'))
const config = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.tpl'),
      templateParameters: apis
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
      for (let i = 0; i < cfg.mocks.length; i++) {
        app.use(mockProxyMiddleware(cfg.mocks[i]))
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
