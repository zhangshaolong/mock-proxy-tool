const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mockProxyMiddleware = require('mock-proxy-middleware')
const mocks = require('./config')
const commander = require('child_process')
const path = require('path')
const fs = require('fs')
const isHttps = false

// 可以通过下边的命令行修改本地server的端口
// npm start --port 8880
let port = 9999
const args = process.argv
if (args.length) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port') {
      port = args[i + 1] || port
    }
  }
}

const findAPIs = (pathName) => {
  return fs.readdirSync(pathName).forEach((fileName) => {
    if (!/^\./.test(fileName)) {
      let filePath = path.join(pathName, fileName)
      if (fs.statSync(filePath).isDirectory()) {
        let indexJs = path.join(filePath, 'index.js')
        if (fs.existsSync(indexJs) && fs.statSync(indexJs).isFile()) {
          entries[filePath.replace(/\//g, '.').replace(/^src\.pages\./, '')] = ['babel-polyfill', path.resolve(indexJs)]
        }
        findAPIs(filePath)
      }
    }
  })
}

findAPIs(path.resolve(__dirname, '../mock'))

const config = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.tpl'),
      templateParameters: {
        abc: 124
      }
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
        app.use(mockProxyMiddleware(mocks[i]))
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
      commander.exec(`${cmd} http${isHttps ? 's' : ''}://${locatIp}:${port}${publicPath}/`)
    }
  }
}

module.exports = config
