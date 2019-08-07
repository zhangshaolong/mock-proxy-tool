const os = require('os')
const mockProxyMiddleware = require('mock-proxy-middleware')
const mocks = require('./configs/mock-proxy')
const serverConfig = require('./configs/server')
const commander = require('child_process')

const isHttps = false

// 可以通过下边的命令行修改本地server的端口
// npm start --port 8880
let port = serverConfig.devPort
const args = process.argv
if (args.length) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port') {
      port = args[i + 1] || port
    }
  }
}
const publicPath = serverConfig.publicPath
const config = {
  cache: true,
  devServer: {
    disableHostCheck: true,
    contentBase: serverConfig.buildPath,
    host: '0.0.0.0',
    port: port,
    publicPath: publicPath,
    // public: 'localhost:' + port + publicPath,
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
