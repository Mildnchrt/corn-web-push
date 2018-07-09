const axios = require('axios')

module.exports = {
  getUser (storeId) {
    return new Promise((resolve, reject) => {
      axios.get('http://192.168.1.254:8003/store/get-store-notification?store_ids[]=' + storeId)
        .then(function (response) {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
}
