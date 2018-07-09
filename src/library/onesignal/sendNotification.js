const { constant } = require('../../config')

module.exports = async function (message) {
  var headers = {
    'Content-Type': constant.ONESIGNAL.CONTENT_TYPE,
    'Authorization': constant.ONESIGNAL.REST_API
  }

  var options = {
    host: constant.ONESIGNAL.HOST,
    port: constant.ONESIGNAL.PORT,
    path: constant.ONESIGNAL.PATH,
    method: 'POST',
    headers: headers
  }

  var https = require('https')
  var req = https.request(options, function (res) {
    res.on('message', function (message) {
      console.log('Response:')
      console.log(JSON.parse(message))
      response = JSON.parse(message)
    })
  })

  req.on('error', function (e) {
    console.log('ERROR:')
    console.log(e)
  })

  req.write(JSON.stringify(message))
  req.end()
}
