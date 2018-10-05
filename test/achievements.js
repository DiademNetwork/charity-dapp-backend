const chai = require('chai')
chai.use(require('chai-spies'))
const expect = chai.expect

const createAchievementSpy = chai.spy()
const confirmAchievementSpy = chai.spy()
const createTransactionSpy = chai.spy()
const confirmTransactionSpy = chai.spy()
const updateAchievementSpy = chai.spy()
const updateTransactionSpy = chai.spy()

const init = (done) => {
  return require('seneca')()
    .test(done)
    .use(require('../src/achievements'))
    .add('role:feeds,cmd:createAchievement', (args, done) => {
      const { actor, object, name, wallet, title } = args
      done(null, createAchievementSpy({ actor, object, name, wallet, title }))
    })
    .add('role:feeds,cmd:createTransaction', (args,done) => {
      const { actor, object, name } = args
      done(null, createTransactionSpy({ actor, object, name }))
    })
    .add('role:feeds,cmd:confirmAchievement', (args, done) => {
      const { actor, object, name, wallet, address } = args
      done(null, confirmAchievementSpy({ actor, object, name, wallet, address }))
    })
    .add('role:feeds,cmd:confirmTransaction', (args, done) => {
      const { actor, object, name } = args
      done(null, confirmTransactionSpy({ actor, object, name }))
    })
    .add('role:feeds,cmd:updateTransaction', (args, done) => {
      const { actor, object, name } = args
      done(null, updateTransactionSpy({ actor, object, name }))
    })
    .add('role:feeds,cmd:updateAchievement', (args, done) => {
      const { actor, object, name, wallet, title, previousLink } = args
      done(null, updateAchievementSpy({ actor, object, name, wallet, title, previousLink }))
    })
}

const initWithMock = (done) => {
  return init(done)
    .act('role:achievements,cmd:create', {}, (err, result) => {

    })
}

const firstAchievement = () => {
  const actor = '1133316623498653'
  const object = 'https://www.facebook.com/permalink.php?story_fbid=1140707799426202&id=100004609778664'
  const name = 'Igor Berlenko'
  const wallet = 'QY7FFhDmFXHGVVRgsyfcA2GJZo9EEtVhEv'
  const title = 'Launch Diadem.Network in mainnet for real impact'

  return { actor, object, name, wallet, title }
}

const secondAchievement = () => {
  const actor = '1133316623498653'
  const object = 'https://www.facebook.com/photo.php?fbid=1143378412492474'
  const name = 'Igor Berlenko'
  const wallet = 'QY7FFhDmFXHGVVRgsyfcA2GJZo9EEtVhEv'
  const title = 'Keep zero-fee transactions for achievers and witnesses'

  return { actor, object, name, wallet, title }
}

describe('achievements', () => {
  describe('create', () => {
    it('should create an achievement', (done) => {
      const service = init(done)

      const { actor, object, name, wallet, title } = firstAchievement()

      service.act('role:achievements,cmd:create', { actor, object, name, wallet, title }, (err, result) => {
        expect(err).to.be.equal(null)
        expect(createTransactionSpy).to.have.been.called.with({ actor, object, name })
        expect(createAchievementSpy).to.have.been.called.with({ actor, object, name, wallet, title })
        done()
      })
    })
  })

  describe('update', () => {
    it('should append new achievement to existing chain of achievements', (done) => {
      const service = init(done)

      service.act('role:achievements,cmd:create', firstAchievement(), (err, result) => {
        expect(err).to.be.equal(null)

        const { actor, object, name, wallet, title } = secondAchievement()
        const { object: previousLink } = firstAchievement()

        service.act('role:achievements,cmd:create', { actor, object, name, wallet, title, previousLink }, (err, result) => {
          expect(err).to.be.equal(null)

          expect(updateTransactionSpy).to.have.been.called.with({ actor, object, name })
          expect(updateAchievementSpy).to.have.been.called.with({ actor, object, name, wallet, title, previousLink })

          done()
        })
      })
    })
  })

  describe('confirm', () => {
    it('should confirm achievement', (done) => {
      const service = init(done)

      const actor = '10156583216029650'
      const object = 'https://www.facebook.com/permalink.php?story_fbid=1140707799426202&id=100004609778664'
      const name = 'Clement Maori Lang-Tribalat Bresson'
      const wallet = 'QY7FFhDmFXHGVVRgsyfcA2GJZo9EEtVhEv'
      const address = 'QetMQCLKHswMsU3NZg9MtWR3R9r9479CAT'

      service.act('role:achievements,cmd:confirm', { actor, object, name, wallet, address }, (err, result) => {
        expect(err).to.be.equal(null)
        expect(confirmTransactionSpy).to.have.been.called.with({ actor, object, name })
        expect(confirmAchievementSpy).to.have.been.called.with({ actor, object, name, wallet, address })
        done()
      })
    })
  })
})
