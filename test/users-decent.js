const chai = require('chai')
chai.use(require('chai-spies'))
const expect = chai.expect

const user1 = {
  userAddress: 'fb-124566928499419',
  userAccount: '124566928499419',
  userName: 'Crypto Igor',
  privateKey: 'privatekey1'
}

const user2 = {
  userAddress: 'fb-1133316623498653',
  userAccount: '1133316623498653',
  userName: 'John Doe',
  privateKey: 'privatekey2'
}

const registerAccountSpy = chai.spy.returns(Promise.resolve({}))
const getAccountByNameSpy = chai.spy.returns(Promise.resolve({ exists: true }))
const listAccountsSpy = chai.spy.returns(Promise.resolve({}))
const openConnectionSpy = chai.spy.returns(Promise.resolve({}))
const dcore = {
  account: () => ({
      registerAccount: registerAccountSpy,
    getAccountByName: getAccountByNameSpy,
    listAccounts: listAccountsSpy,
  }),
  connection: () => ({
    openConnection: openConnectionSpy
  })
}
const registrarAccountId = '1.2.358'
const registrarPrivateKey = 'privatekey3'
const lowerBoundAccounts = '1.2.300'

const init = (done) => {
  return require('seneca')()
    .test(done)
    .use(require('../src/users/decent'), { dcore, registrarAccountId, registrarPrivateKey, lowerBoundAccounts })
    .use(function mockUsers() {
      this.add('init:mockUsers', (args, done) => {
        this.act('role:users,cmd:register', user1, (err, result) => {
          expect(err).to.be.equal(null)
          expect(dcore.account().registerAccount).to.have.been.called.with(user1.userAddress, user1.privateKey, user1.privateKey, user1.privateKey, registrarAccountId, registrarPrivateKey)
          expect(dcore.connection().openConnection).to.have.been.called()
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
      expect(dcore.account().getAccountByName).to.have.been.called.with(user1.userAddress)
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

  it('should retrieve all users', (done) => {
    const service = init(done)

    service.act('role:users,cmd:getUsers', (err, result) => {
      expect(err).to.be.equal(null)
      expect(dcore.account().listAccounts).to.have.been.called.with(lowerBoundAccounts, 100)
      done()
    })
  })
})
