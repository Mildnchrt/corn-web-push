const path = require('path')

module.exports = async function (request, response) {
  response.sendFile(path.join(__dirname + '/../../index.html')) 
}