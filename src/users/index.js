module.exports = function users(options) {
  this.add('role:users,cmd:register', (args, done) => {
    done(null, {})
  })

  this.add('role:users,cmd:checkUserName', (args, done) => {
    done(null, {})
  })

  this.add('role:users,cmd:checkUserAddress', (args, done) => {
    done(null, {})
  })

  this.add('role:users,cmd:getUsers', (args, done) => {
    done(null, {})
  })
}
