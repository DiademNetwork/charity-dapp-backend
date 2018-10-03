const chai = require('chai')
chai.use(require('chai-spies'))
const expect = chai.expect

const user1 = {
  userAddress: 'QXgSuvpUyMdaGScAbuLAKr3jNNuqNEM2So',
  userAccount: '124566928499419',
  userName: 'Crypto Igor',
  token: ''
}

const user2 = {
  userAddress: 'QY7FFhDmFXHGVVRgsyfcA2GJZo9EEtVhEv',
  userAccount: '1133316623498653',
  userName: 'John Doe',
  token: ''
}

const init = (done) => {
  return require('seneca')()
    .test(done)
    .use(require('../src/users'))
    .use('basic')
    .use('entity')
    .use(function mockUsers() {
      this.add('init:mockUsers', (args, done) => {
        this.act('role:users,cmd:register', user1, (err, result) => {
          expect({
            userAccount: result.userAccount,
            userAddress: result.userAddress,
            userName: result.userName,
            token: result.token
          }).to.be.deep.equal(user1)
          done()
        })
      })
    })
}

describe('users', () => {
  it('should check registered user', (done) => {
    const service = init(done)

    service.act('role:users,cmd:checkUserAccount', { userAccount: user1.userAccount }, (err, result) => {
      expect(err).to.be.equal(null)
      expect(result).to.be.deep.equal({ exists: true })
      done()
    })
  })

  it('should check non-registered user', (done) => {
    const service = init(done)

    service.act('role:users,cmd:checkUserAccount', { userAccount: user2.userAccount }, (err, result) => {
      expect(err).to.be.equal(null)
      expect(result).to.be.deep.equal({ exists: false })
      done()
    })
  })

  it('should check existing address', (done) => {
    const service = init(done)

    service.act('role:users,cmd:checkUserAddress', { userAddress: user1.userAddress }, (err, result) => {
      expect(err).to.be.equal(null)
      expect(result).to.be.deep.equal({ exists: true })
      done()
    })
  })

  it('should check non-existing address', (done) => {
    const service = init(done)

    service.act('role:users,cmd:checkUserAddress', { userAddress: user2.userAddress }, (err, result) => {
      expect(err).to.be.equal(null)
      expect(result).to.be.deep.equal({ exists: false })
      done()
    })
  })

  it('should retrieve all users', (done) => {
    const service = init(done)

    service.act('role:users,cmd:getUsers', (err, result) => {
      expect(err).to.be.equal(null)
      expect(result.length).to.be.equal(1)
      expect({
        userAccount: result[0].userAccount,
        userAddress: result[0].userAddress,
        userName: result[0].userName,
        token: result[0].token
      }).to.be.deep.equal(user1)
      done()
    })
  })
})
