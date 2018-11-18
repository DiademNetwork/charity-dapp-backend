const chai = require('chai')
chai.use(require('chai-spies'))
const expect = chai.expect

const init = (done) => {
  return require('seneca')()
    .test(done)
    .use(require('../src/blockchains/qtum'))
}

describe('qtum', () => {
  describe('support', () => {
    it('should prepare transaction', (done) => {
      const service = init(done)

      service.act('role:qtum,cmd:prepareSupport', (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.deep.equal({ address: 'QetMQCLKHswMsU3NZg9MtWR3R9r9479CAT', encodedData: '68656c6c6f7720776f726c64' })
        done()
      })
    })

    it('should broadcast transaction', (done) => {
      const service = init(done)

      service.act('role:qtum,cmd:broadcastSupport', (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.deep.equal({})
        done()
      })
    })
  })

  describe('deposit', () => {
    it('should prepare transaction', (done) => {
      const service = init(done)

      service.act('role:qtum,cmd:prepareDeposit', (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.deep.equal({ address: 'QetMQCLKHswMsU3NZg9MtWR3R9r9479CAT', encodedData: '68656c6c6f7720776f726c64' })
        done()
      })
    })

    it('should broadcast transaction', (done) => {
      const service = init(done)

      service.act('role:qtum,cmd:broadcastDeposit', (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.deep.equal({})
        done()
      })
    })
  })

  describe('withdraw', () => {
    it('should prepare transaction', () => {
    })

    it('should broadcast transaction', () => {
    })
  })
})
