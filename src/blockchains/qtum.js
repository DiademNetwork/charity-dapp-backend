module.exports = function qtum(options) {
  this.add('role:qtum,cmd:prepareSupport', (args, done) => {
    done(null, {})
  })

  this.add('role:qtum,cmd:broadcastSupport', (args, done) => {
    done(null, {})
  })

  this.add('role:qtum,cmd:prepareDeposit', (args, done) => {
    done(null, {})
  })

  this.add('role:qtum,cmd:broadcastDeposit', (args, done) => {
    done(null, {})
  })
}
