const path = require('path')

module.exports = function (request, response) {
  response.sendFile(path.join(__dirname + '/../../index.html')) 
}