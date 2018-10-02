const chai = require('chai')
chai.use(require('chai-spies'))
const expect = chai.expect

const init = (done) => {
  return require('seneca')()
    .test(done)
    .use(require('../src/users'))
}

describe('users', () => {
  it('should register user', (done) => {
    const service = init(done)

    service.act('role:users,cmd:register', (err, result) => {
      expect(err).to.be.equal(null)
      expect(result).to.be.deep.equal({})
      done()
    })
  })

  it('should check user name', (done) => {
    const service = init(done)

    service.act('role:users,cmd:checkUserName', (err, result) => {
      expect(err).to.be.equal(null)
      expect(result).to.be.deep.equal({})
      done()
    })
  })

  it('should check user address', (done) => {
    const service = init(done)

    service.act('role:users,cmd:checkUserAddress', (err, result) => {
      expect(err).to.be.equal(null)
      expect(result).to.be.deep.equal({})
      done()
    })
  })

  it('should retrieve all users', (done) => {
    const service = init(done)

    service.act('role:users,cmd:getUsers', (err, result) => {
      expect(err).to.be.equal(null)
      expect(result).to.be.deep.equal({})
      done()
    })
  })
})
