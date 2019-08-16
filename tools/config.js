module.exports = {
  mocks: [
    {
      rules: ['/audit-api/', '/common-api/'],
      project: 'campaign'
    },
    {
      rules: ['/news-api/'],
      project: 'cms'
    }
  ],
  port: 8890,
  isHttps: false
}