const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const stream = require('getstream')
const client = stream.connect(process.env.STREAM_KEY, process.env.STREAM_SECRET)
const achievementsAggregated = client.feed(process.env.STREAM_ACHIEVEMENTS_AGGREGATED_GROUP, process.env.STREAM_ACHIEVEMENTS_AGGREGATED_FEED)
const achievementsFlat = client.feed(process.env.STREAM_ACHIEVEMENTS_FLAT_GROUP, process.env.STREAM_ACHIEVEMENTS_FLAT_FEED)
const transactionsFeed = client.feed(process.env.STREAM_TRANSACTIONS_GROUP, process.env.STREAM_TRANSACTIONS_FEED)

const dcore = require('dcorejs')
const chainId = '9c54faed15d4089d3546ac5eb0f1392434a970be15f1452ce1e7764f70f02936'
const dcoreNetworkWSPaths = ['wss://hackathon2.decent.ch:8090']
dcore.initialize({ chainId, dcoreNetworkWSPaths })

const registrarPrivateKey = process.env.REGISTRAR_PRIVATE_KEY
const registrarAccountId = process.env.REGISTRAR_ACCOUNT_ID
const lowerBoundAccounts = '1.2.300'

console.log('achievementsAggregated', achievementsAggregated.getReadOnlyToken())
console.log('achievementsFlat', achievementsFlat.getReadOnlyToken())
console.log('transactionsFeed', transactionsFeed.getReadOnlyToken())

const SenecaWeb = require('seneca-web')
const Express = require('express')
const Router = Express.Router
const context = new Router()

const app = Express()
  .use(require('body-parser').json())
  .use(context)
  .listen(process.env.PORT, () => {
    console.log(`listen at ${process.env.PORT}`)
  })

const service = require('seneca')({ debug: { undead: true } })
  .use(SenecaWeb, {
    context: context,
    adapter: require('seneca-web-adapter-express'),
    options: { parseBody: false }
  })
  .use('basic')
  .use('entity')
  .use(require('../feeds'), { achievementsAggregated, achievementsFlat, transactionsFeed })
  .use(require('../achievements'))
  .use(require('../users/decent'), { dcore, registrarAccountId, registrarPrivateKey, lowerBoundAccounts })
  .use(require('../networks/facebook'))
  .use(require('../blockchains/decent'))
  .use(require('../endpoints/charityAPI'))
