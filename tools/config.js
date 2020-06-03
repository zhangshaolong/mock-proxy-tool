module.exports = {
  mocks: [
    {
      rules: ['/audit-api/', '/common-api/'],
      project: 'campaign',
      // proxyConfig: { // 可以不走本地mock而指向另外服务器
      //   host: 'www.xxx.com',
      //   port: 2020,
      //   redirect: (path) => {
      //     return path
      //   },
      //   ignorePaths: {
      //     '/audit-api/material/audit': true
      //   }
      // }
    },
    {
      rules: ['/news-api/'],
      project: 'cms'
    }
  ],
  port: 8890,
  isHttps: false
}