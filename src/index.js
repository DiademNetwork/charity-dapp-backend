const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const stream = require('getstream')
const client = stream.connect(process.env.STREAM_KEY, process.env.STREAM_SECRET)
const achievementsAggregated = client.feed(process.env.STREAM_ACHIEVEMENTS_AGGREGATED_GROUP, process.env.STREAM_ACHIEVEMENTS_AGGREGATED_FEED)
const achievementsFlat = client.feed(process.env.STREAM_ACHIEVEMENTS_FLAT_GROUP, process.env.STREAM_ACHIEVEMENTS_FLAT_FEED)
const transactionsFeed = client.feed(process.env.STREAM_TRANSACTIONS_GROUP, process.env.STREAM_TRANSACTIONS_FEED)

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
  .use(require('./feeds'), { achievementsAggregated, achievementsFlat, transactionsFeed })
  .use(require('./achievements'))
  .use(require('./users'))
  .use(require('./networks/facebook'))
  .use(require('./blockchains/qtum'))
  .use(require('./endpoints/legacyQtumAPI'))
  .use(require('./endpoints/charityAPI'))
