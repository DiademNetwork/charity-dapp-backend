/*
  @userAddress name of account in decent network
  @userAccount id of profile in facebook
  @userName name of profile in facebook
*/

module.exports = function users(options) {
  const { dcore, registrarAccountId, registrarPrivateKey, lowerBoundAccounts } = options

  let connection = null
  const addressPrefix = 'ddm'

  this.add('init:users', (args, done) => {
    connection = dcore.connection()

    connection.openConnection().then((res) => {
      console.log(`dcore connected: ${connection.isConnected}`)
      done()
    }).catch((err) => {
      done(err)
    })
  })

  this.add('role:users,cmd:register', (args, done) => {
    const { userAddress, userAccount, userName, publicKey } = args
    const publicOwnerKey = publicKey
    const publicActiveKey = publicKey
    const publicMemoKey = publicKey

    // assert(userAddress, `${addressPrefix}-${userAccount}`)

    dcore.account().registerAccount(
      userAddress,
      publicOwnerKey,
      publicActiveKey,
      publicMemoKey,
      registrarAccountId,
      registrarPrivateKey
    ).then((result) => {
      done(null, result)
    }).catch((err) => {
      done(err)
    })
  })

  this.add('role:users,cmd:checkUserAddress', (args, done) => {
    const { userAddress } = args

    dcore.account().getAccountByName(userAddress).then((user) => {
      if (user) {
        done(null, { exists: true })
      } else {
        done(null, { exists: false })
      }
    }).catch((err) => {
      done(null, { exists: false })
    })
  })

  this.add('role:users,cmd:checkUserAccount', (args, done) => {
    const { userAccount } = args
    const userAddress = `${addressPrefix}-${userAccount}`

    dcore.account().getAccountByName(userAddress).then((user) => {
      if (user) {
        done(null, { exists: true })
      } else {
        done(null, { exists: false })
      }
    }).catch((err) => {
      done(null, { exists: false })
    })
  })

  this.add('role:users,cmd:getUsers', (args, done) => {
    dcore.account().listAccounts(lowerBoundAccounts, 100).then((accounts) => {
      const usersList = accounts.map((account) => ({
        userAddress: account[0],
        userAccount: account[1],
        userName: account[0]
      }))
      done(null, { usersList })
    }).catch((err) => {
      done(err)
    })
  })
}
