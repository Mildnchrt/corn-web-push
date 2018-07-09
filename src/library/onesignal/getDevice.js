const axios = require('axios')
const { constant } = require('../../config')

module.exports = {
  getDevice (playerId) {
    return new Promise((resolve, reject) => {
      axios.get('https://onesignal.com/api/v1/players/' + playerId + '?app_id=' + constant.ONESIGNAL.APP_ID)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
}
