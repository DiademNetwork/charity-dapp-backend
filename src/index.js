const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

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
  .use(require('./achievements'))
  .use(require('./users'))
  .use(require('./networks/facebook'))
  .use(require('./blockchains/qtum'))
  .use(require('./endpoints/legacyQtumAPI'))
  .use(require('./endpoints/charityAPI'))
