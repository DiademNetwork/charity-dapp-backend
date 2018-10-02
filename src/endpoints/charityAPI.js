module.exports = function charityAPI(options) {
  this.add('init:charityAPI', (args, done) => {
    this.act('role:web', {
      routes: {
        prefix: '/api',
        pin: 'role:api,path:*',
        map: {
        }
      }
    }, done)
  })
}
