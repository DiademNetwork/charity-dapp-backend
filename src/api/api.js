module.exports = function api(options) {
  this.add('init:api', (args, done) => {
    this.act('role:web', {
      routes: {
        prefix: '/api/',
        pin: 'role:api,path:*',
        map: {

        }
      }
    }, done)
  })
}
