module.exports = {
  mocks: [
    {
      apiConfig: {
        type: 'prefix',
        value: ['/api/', '/coupon/', '/public/']
      },
      mockPath: 'mock/project-a'
    },
    {
      apiConfig: {
        type: 'prefix',
        value: ['/api/', '/coupon/', '/public/']
      },
      mockPath: 'mock/project-b'
    }
  ],
  port: 8899,
  isHttps: true
}