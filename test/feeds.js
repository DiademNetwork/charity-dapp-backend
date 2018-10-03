const chai = require('chai')
chai.use(require('chai-spies'))
const expect = chai.expect

const achievementsAggregated = {
  addActivity: chai.spy.returns(Promise.resolve())
}
const achievementsFlat = {
  addActivity: chai.spy.returns(Promise.resolve())
}
const transactionsFeed = {
  addActivity: chai.spy.returns(Promise.resolve())
}

const init = (done) => {
  return require('seneca')()
    .test(done)
    .use(require('../src/feeds'), {
      achievementsAggregated, achievementsFlat, transactionsFeed
    })
}

describe('feeds', () => {
  it('should create achievement', (done) => {
    const service = init(done)

    service.act('role:feeds,cmd:createAchievement', (err, result) => {
      expect(err).to.be.equal(null)
      expect(achievementsAggregated.addActivity).to.have.been.called()
      expect(achievementsFlat.addActivity).to.have.been.called()
      done()
    })
  })

  it('should update achievement', (done) => {
    const service = init(done)

    service.act('role:feeds,cmd:updateAchievement', (err, result) => {
      expect(err).to.be.equal(null)
      expect(achievementsAggregated.addActivity).to.have.been.called()
      expect(achievementsFlat.addActivity).to.have.been.called()
      done()
    })
  })

  it('should confirm achievement', (done) => {
    const service = init(done)

    service.act('role:feeds,cmd:confirmAchievement', (err, result) => {
      expect(err).to.be.equal(null)
      expect(achievementsAggregated.addActivity).to.have.been.called()
      expect(achievementsFlat.addActivity).to.have.been.called()
      done()
    })
  })

  it('should support achievement', (done) => {
    const service = init(done)

    service.act('role:feeds,cmd:supportAchievement', (err, result) => {
      expect(err).to.be.equal(null)
      expect(achievementsAggregated.addActivity).to.have.been.called()
      expect(achievementsFlat.addActivity).to.have.been.called()
      done()
    })
  })

  it('should deposit reward for an achievement', (done) => {
    const service = init(done)

    service.act('role:feeds,cmd:depositReward', (err, result) => {
      expect(err).to.be.equal(null)
      expect(achievementsAggregated.addActivity).to.have.been.called()
      expect(achievementsFlat.addActivity).to.have.been.called()
      done()
    })
  })

  it('should create achievement', (done) => {
    const service = init(done)

    service.act('role:feeds,cmd:depositReward', (err, result) => {
      expect(err).to.be.equal(null)
      expect(achievementsAggregated.addActivity).to.have.been.called()
      expect(achievementsFlat.addActivity).to.have.been.called()
      done()
    })
  })

  it('should withdraw reward from achievement', (done) => {
    const service = init(done)

    service.act('role:feeds,cmd:withdrawReward', (err, result) => {
      expect(err).to.be.equal(null)
      expect(achievementsAggregated.addActivity).to.have.been.called()
      expect(achievementsFlat.addActivity).to.have.been.called()
      done()
    })
  })

  it('should save register transaction', (done) => {
    const service = init(done)

    service.act('role:feeds,cmd:registerTransaction', (err, result) => {
      expect(err).to.be.equal(null)
      expect(transactionsFeed.addActivity).to.have.been.called()
      done()
    })
  })

  it('should save confirm transaction', (done) => {
    const service = init(done)

    service.act('role:feeds,cmd:confirmTransaction', (err, result) => {
      expect(err).to.be.equal(null)
      expect(transactionsFeed.addActivity).to.have.been.called()
      done()
    })
  })

  it('should save create transaction', (done) => {
    const service = init(done)

    service.act('role:feeds,cmd:createTransaction', (err, result) => {
      expect(err).to.be.equal(null)
      expect(transactionsFeed.addActivity).to.have.been.called()
      done()
    })
  })

  it('should save withdraw transaction', (done) => {
    const service = init(done)

    service.act('role:feeds,cmd:withdrawTransaction', (err, result) => {
      expect(err).to.be.equal(null)
      expect(transactionsFeed.addActivity).to.have.been.called()
      done()
    })
  })

  it('should save support transaction', (done) => {
    const service = init(done)

    service.act('role:feeds,cmd:supportTransaction', (err, result) => {
      expect(err).to.be.equal(null)
      expect(transactionsFeed.addActivity).to.have.been.called()
      done()
    })
  })

  it('should save deposit transaction', (done) => {
    const service = init(done)

    service.act('role:feeds,cmd:depositTransaction', (err, result) => {
      expect(err).to.be.equal(null)
      expect(transactionsFeed.addActivity).to.have.been.called()
      done()
    })
  })
})
