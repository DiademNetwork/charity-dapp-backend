module.exports = function charityAPI(options) {
  this.add('init:charityAPI', (args, done) => {
    this.act('role:web', {
      routes: {
        prefix: '/',
        pin: 'role:api,path:*',
        map: {
          "ping": { GET: true },
          "users": { GET: true },
          "check": { POST: true },
          "checkAddress": { POST: true },
          "register": { POST: true },
          "confirm": { POST: true },
          "create": { POST: true },
          "support": { POST: true },
          "deposit": { POST: true }
        }
      }
    }, done)
  })

  this.add('role:api,path:ping', (args, done) => {
    done(null, { pong: Date.now() })
  })

  /* users */
  this.add('role:api,path:register', (args, done) => {
    const { address, name, user, token, publicKey } = args.args.body

    const userData = {
      userAddress: address,
      userName: name,
      userAccount: user,
      publicKey: publicKey
    }
    this.act('role:users,cmd:register', userData, done)
  })

  this.add('role:api,path:users', (args, done) => {
    this.act('role:users,cmd:getUsers', args.args.body, done)
  })

  this.add('role:api,path:check', (args, done) => {
    const userData = {
      userAccount: args.args.body.user
    }
    this.act('role:users,cmd:checkUserAccount', userData, done)
  })

  this.add('role:api,path:checkAddress', (args, done) => {
    const userData = {
      userAddress: args.args.body.walletAddress
    }
    this.act('role:users,cmd:checkUserAddress', userData, done)
  })
  /* users */

  /* achievements */
  this.add('role:api,path:create', (args, done) => {
    const { address, link, name, title, user, previousLink } = args.args.body
    const achievementData = {
      actor: user,
      object: link,
      name: name,
      wallet: address,
      title: title,
      previousLink: previousLink
    }
    this.act('role:achievements,cmd:create', achievementData, done)
  })

  const addressPrefix = 'ddm'
  this.add('role:api,path:confirm', (args, done) => {
    const { address, link, token, user, wallet, name } = args.args.body
    const actor = address.replace(`${addressPrefix}-`, '')
    const confirmationData = {
      actor: user,
      object: link,
      name: name,
      wallet: wallet,
      address: address
    }
    this.act('role:achievements,cmd:confirm', confirmationData, done)
  })

  this.add('role:api,path:withdraw', (args, done) => {
    this.act('role:achievements,cmd:withdraw', args.args.body, done)
  })
  /* achievements */

  /* decent */
  this.add('role:api,path:encodeSupport', (args, done) => {
    this.act('role:decent,cmd:prepareSupport', args.args.body, done)
  })

  this.add('role:api,path:encodeDeposit', (args, done) => {
    this.act('role:decent,cmd:prepareDeposit', args.args.body, done)
  })

  this.add('role:api,path:support', (args, done) => {
    this.act('role:decent,cmd:broadcastSupport', args.args.body, done)
  })

  this.add('role:api,path:deposit', (args, done) => {
    this.act('role:decent,cmd:broadcastDeposit', args.args.body, done)
  })
  /* decent */

}
