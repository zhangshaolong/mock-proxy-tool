module.exports = [
  {
    rules: [/^\/audit-api\//, /^\/common-api\//],
    project: 'campaign',
    proxyConfig: { // 可以不走本地mock而指向另外服务器
      // host: 'www.xxx.com',
      // port: 2020,
      // redirect: (path) => {
      //   return path
      // },
      // excludes: [
      //   '^/audit-api/material/audit'
      // ]
    },
    mockConfig: {
      path: 'mock/campaign'
    }
  },
  {
    rules: [/^\/news-api\//],
    project: 'cms',
    mockConfig: {
      path: 'mock/cms'
    }
  }
]