module.exports = function feeds(options) {
  const stubTxId = 'f683f345474fd4d3c10c533b286f81a2c8ffb1b3bc041e843db732ab116ca340'

  const { achievementsFlat, achievementsAggregated, transactionsFeed } = options

  this.add('role:feeds,cmd:createAchievement', async(args, done) => {
    const {
      name,   // creator fullname
      actor,  // creator account
      wallet, // creator address
      object, // achievement link
      title  // achievement title
    } = args

    const activity = Object.assign({}, {
      name, actor, wallet, object, title
    }, {
      foreign_id: `create_${object}`,
      verb: 'create',
      target: stubTxId,
      time: new Date()
    })

    achievementsFlat.addActivity(activity)
    achievementsAggregated.addActivity(activity)

    done()
  })

  this.add('role:feeds,cmd:updateAchievement', async (args, done) => {
    const {
      name,   // creator fullname
      actor,  // creator account
      wallet, // creator address
      object, // achievement link
      title,  // achievement title
      previousLink // previous achievement link
    } = args

    const activity = Object.assign({}, {
      name, actor, wallet, object, title, previousLink
    }, {
      foreign_id: `update_${object}`,
      verb: 'update',
      target: stubTxId,
      time: new Date()
    })

    achievementsFlat.addActivity(activity)
    achievementsAggregated.addActivity(activity)

    done()
  })

  this.add('role:feeds,cmd:confirmAchievement', async (args, done) => {
    const {
      name,   // witness fullname
      actor,  // witness account
      wallet, // creator address
      object, // achievement link
      address // witness address
    } = args

    const activity = Object.assign({}, {
      name, actor, wallet, object, address
    }, {
      foreign_id: `confirm_${object}`,
      verb: 'confirm',
      target: stubTxId,
      time: new Date()
    })

    achievementsFlat.addActivity(activity)
    achievementsAggregated.addActivity(activity)

    done()
  })

  this.add('role:feeds,cmd:supportAchievement', async (args, done) => {
    const {
      name,   // sponsor fullname
      actor,  // sponsor account
      wallet, // creator address
      object, // achievement link
      address, // sponsor address
      amount // payment amount
    } = args

    const activity = Object.assign({}, {
      name, actor, wallet, object, address, amount
    }, {
      foreign_id: `support_${object}`,
      verb: 'support',
      target: stubTxId,
      time: new Date()
    })

    achievementsFlat.addActivity(activity)
    achievementsAggregated.addActivity(activity)

    done()
  })

  this.add('role:feeds,cmd:depositReward', async (args, done) => {
    const {
      name,   // sponsor fullname
      actor,  // sponsor account
      wallet, // creator address
      object, // achievement link
      address, // sponsor address
      amount // payment amount
    } = args

    const activity = Object.assign({}, {
      name, actor, wallet, object, address, amount
    }, {
      foreign_id: `deposit_${object}`,
      verb: 'deposit',
      target: stubTxId,
      time: new Date()
    })

    achievementsFlat.addActivity(activity)
    achievementsAggregated.addActivity(activity)

    done()
  })

  this.add('role:feeds,cmd:withdrawReward', async (args, done) => {
    const {
      name,   // sponsor fullname
      actor,  // sponsor account
      wallet, // creator address
      object, // achievement link
      address, // sponsor address
      amount // payment amount
    } = args

    const activity = Object.assign({}, {
      name, actor, wallet, object, address, amount
    }, {
      foreign_id: `withdraw_${object}`,
      verb: 'withdraw',
      target: stubTxId,
      time: new Date()
    })

    achievementsFlat.addActivity(activity)
    achievementsAggregated.addActivity(activity)

    done()
  })

  this.add('role:feeds,cmd:registerTransaction', async (args, done) => {
    const {
      actor,  // user account
      object, // user address
      name    // user fullname
    } = args

    const activity = Object.assign({}, {
      name, actor, object
    }, {
      foreign_id: `register_${object}`,
      verb: 'register',
      target: stubTxId,
      time: new Date()
    })

    transactionsFeed.addActivity(activity).then(done)
  })

  this.add('role:feeds,cmd:confirmTransaction', async (args, done) => {
    const {
      actor,  // witness account
      object, // achievement link
      name    // witness fullname
    } = args

    const activity = Object.assign({}, {
      name, actor, object
    }, {
      foreign_id: `confirm_${object}`,
      verb: 'confirm',
      target: stubTxId,
      time: new Date()
    })

    transactionsFeed.addActivity(activity).then(done)
  })

  this.add('role:feeds,cmd:createTransaction', async (args, done) => {
    const {
      actor,  // user account
      object, // achievement link
      name    // user fullname
    } = args

    const activity = Object.assign({}, {
      name, actor, object
    }, {
      foreign_id: `create_${object}`,
      verb: 'create',
      target: stubTxId,
      time: new Date()
    })

    transactionsFeed.addActivity(activity).then(done)
  })

  this.add('role:feeds,cmd:withdrawTransaction', async (args, done) => {
    const {
      actor,  // user account
      object // achievement link
    } = args

    const activity = Object.assign({}, {
      actor, object
    }, {
      foreign_id: `withdraw_${object}`,
      verb: 'withdraw',
      target: stubTxId,
      time: new Date()
    })

    transactionsFeed.addActivity(activity).then(done)
  })

  this.add('role:feeds,cmd:supportTransaction', async (args, done) => {
    const {
      actor,  // sponsor account
      object, // achievement link
      name    // sponsor fullname
    } = args

    const activity = Object.assign({}, {
      name, actor, object
    }, {
      foreign_id: `support_${object}`,
      verb: 'support',
      target: stubTxId,
      time: new Date()
    })

    transactionsFeed.addActivity(activity).then(done)
  })

  this.add('role:feeds,cmd:depositTransaction', async (args, done) => {
    const {
      actor,  // sponsor account
      object, // achievement link
      name,    // sponsor fullname
      witness, // witness account
      witnessName // witness fullname
    } = args

    const activity = Object.assign({}, {
      name, actor, object
    }, {
      foreign_id: `deposit_${object}`,
      verb: 'deposit',
      target: stubTxId,
      time: new Date()
    })

    transactionsFeed.addActivity(activity).then(done)
  })
}
