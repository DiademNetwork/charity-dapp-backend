module.exports = function achievements(options) {
  this.add('role:achievements,cmd:create', (args, done) => {
    const { actor, object, name, wallet, title, previousLink } = args

    if (previousLink) {
      this.act('role:feeds,cmd:updateTransaction', { actor, object, name }, (err, result) => {
        this.act('role:feeds,cmd:updateAchievement', { actor, object, name, wallet, title, previousLink }, done)
      })
    } else {
      this.act('role:feeds,cmd:createTransaction', { actor, object, name }, (err, result) => {
        this.act('role:feeds,cmd:createAchievement', { actor, object, name, wallet, title }, done)
      })
    }
  })

  this.add('role:achievements,cmd:confirm', (args, done) => {
    const { actor, object, name, wallet, address } = args

    this.act('role:feeds,cmd:confirmTransaction', { actor, object, name }, (err, result) => {
      this.act('role:feeds,cmd:confirmAchievement', { actor, object, name, wallet, address }, done)
    })
  })
}
