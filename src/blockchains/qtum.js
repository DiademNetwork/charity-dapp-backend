module.exports = function qtum(options) {
  this.add('role:qtum,cmd:prepareSupport', (args, done) => {
    done(null, { address: 'QetMQCLKHswMsU3NZg9MtWR3R9r9479CAT', encodedData: '68656c6c6f7720776f726c64' })
  })

  this.add('role:qtum,cmd:broadcastSupport', (args, done) => {
    done(null, {})
  })

  this.add('role:qtum,cmd:prepareDeposit', (args, done) => {
    done(null, { address: 'QetMQCLKHswMsU3NZg9MtWR3R9r9479CAT', encodedData: '68656c6c6f7720776f726c64' })
  })

  this.add('role:qtum,cmd:broadcastDeposit', (args, done) => {
    done(null, {})
  })
}
