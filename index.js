const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const routeConfig = require('./src/config/routes')
const jwt = require('jsonwebtoken')
const catchAsyncErrors = require('./src/utils/catchAsyncErrors')
const { requestMiddleware, errorExceptionMiddleware, logMiddleware } = require('./src/middlewares')
const Raven = require('raven')
const { constant } = require('./src/config')

const app = express()
// Must configure Raven before doing anything else with it
Raven.config(constant.SENTRY.SENTRY_URL).install()

let startAt = ''

// use body parser
app.use(bodyParser.json({
  type: '*/*'
}))

// The request handler must be the first middleware on the app
app.use(Raven.requestHandler())

// handling request (extract or check param before pass to controller)
app.use(requestMiddleware)

// log middleware using morgan
app.use(logMiddleware)

// server status
app.get('/', function mainHandler (req, res) {
  try { 
    let current = new Date()
    let uptime = Math.abs(current - startAt) / 36e5;
    let server = {
      started: startAt,
      uptime: uptime,
      status: 'OK'
    }
    res.render(server)
  } catch (e) {
    Raven.captureException(e)
  }
})

// generating API route
Object.keys(routeConfig).forEach((key, index) => {
  routeConfig[key].forEach((route) => {
    const {methods ,path ,controller} = route
    router[methods.toLowerCase()](`/${key}${path}`, catchAsyncErrors(controller))
  })
})
app.use('/api', router)

// The error handler must be before any other error middleware
app.use(Raven.errorHandler())

// catch application error then managing response
app.use(errorExceptionMiddleware)

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500
  res.end(res.sentry + '\n')
})

// start server at specific port
app.listen(8005, () => {
  startAt = new Date()
  console.log('app listening on port 8005!')
})