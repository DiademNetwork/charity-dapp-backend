module.exports = function users(options) {
  this.add('role:users,cmd:register', (args, done) => {
    const user = this.make('user')
    user.userAddress = args.userAddress
    user.userAccount = args.userAccount
    user.userName = args.userName
    user.token = args.token

    user.save$((err, user) => {
      done(err, user)
    })
  })

  this.add('role:users,cmd:checkUserAddress', (args, done) => {
    this.make('user').load$({ userAddress: args.userAddress }, (err, user) => {
      if (user) {
        done(null, { exists: true })
      } else {
        done(null, { exists: false })
      }
    })
  })

  this.add('role:users,cmd:checkUserAccount', (args, done) => {
    this.make('user').load$({ userAccount: args.userAccount }, (err, user) => {
      if (user) {
        done(null, { exists: true })
      } else {
        done(null, { exists: false })
      }
    })
  })

  this.add('role:users,cmd:getUsers', (args, done) => {
    this.make('user').list$((err, list) => {
      done(null, list)
    })
  })
}
