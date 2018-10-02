const chai = require('chai')
chai.use(require('chai-spies'))
const expect = chai.expect

const init = (done) => {
  return require('seneca')()
    .test(done)
    .use(require('../src/achievements'))
}

describe('achievements', () => {
  describe('create', () => {
    it('should create an achievement', (done) => {
      const service = init(done)

      service.act('role:achievements,cmd:create', (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.deep.equal({})
        done()
      })
    })
  })

  describe('confirm', () => {
    it('should confirm achievement', (done) => {
      const service = init(done)

      service.act('role:achievements,cmd:confirm', (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.deep.equal({})
        done()
      })
    })
  })
})
