module.exports = function legacyQtumApi(options) {
  this.add('init:legacyQtumApi', (args, done) => {
    this.act('role:web', {
      routes: {
        prefix: '/',
        pin: 'role:legacyQtumApi,path:*',
        map: {
          "users": { GET: true },
          "check": { POST: true },
          "checkQtumAddress": { POST: true },
          "register": { POST: true },
          "confirm": { POST: true },
          "create": { POST: true },
          "encodeSupport": { POST: true },
          "encodeDeposit": { POST: true },
          "support": { POST: true },
          "deposit": { POST: true }
        }
      }
    }, done)
  })

  /* users */
  this.add('role:legacyQtumApi,path:register', (args, done) => {
    this.act('role:users,cmd:register', args.args.body, done)
  })

  this.add('role:legacyQtumApi,path:users', (args, done) => {
    this.act('role:users,cmd:getUsers', args.args.body, done)
  })

  this.add('role:legacyQtumApi,path:check', (args, done) => {
    this.act('role:users,cmd:checkUserAccount', args.args.body, done)
  })

  this.add('role:legacyQtumApi,path:checkQtumAddress', (args, done) => {
    this.act('role:users,cmd:checkUserAddress', args.args.body, done)
  })
  /* users */

  /* achievements */
  this.add('role:legacyQtumApi,path:create', (args, done) => {
    this.act('role:achievements,cmd:create', args.args.body, done)
  })

  this.add('role:legacyQtumApi,path:confirm', (args, done) => {
    this.act('role:achievements,cmd:confirm', args.args.body, done)
  })

  this.add('role:legacyQtumApi,path:withdraw', (args, done) => {
    this.act('role:achievements,cmd:withdraw', args.args.body, done)
  })
  /* achievements */

  /* qtum */
  this.add('role:legacyQtumApi,path:encodeSupport', (args, done) => {
    this.act('role:qtum,cmd:prepareSupport', args.args.body, done)
  })

  this.add('role:legacyQtumApi,path:encodeDeposit', (args, done) => {
    this.act('role:qtum,cmd:prepareDeposit', args.args.body, done)
  })

  this.add('role:legacyQtumApi,path:support', (args, done) => {
    this.act('role:qtum,cmd:broadcastSupport', args.args.body, done)
  })

  this.add('role:legacyQtumApi,path:deposit', (args, done) => {
    this.act('role:qtum,cmd:broadcastDeposit', args.args.body, done)
  })
  /* qtum */
}
