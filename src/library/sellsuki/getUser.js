const axios = require('axios')

module.exports = async function (storeId) {
  return new Promise((resolve, reject) => {
    resolve(
      axios.get('http://192.168.1.254:8003/store/get-store-notification-mock?store_ids[]=' + storeId)
        .then(function (response) {
          return response
        })
        .catch(function (error) {
          console.log(error)
        })
    )
  })
}
