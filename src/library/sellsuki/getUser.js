const axios = require('axios')

module.exports = {
  async getUser (storeId) {
    const { data } = await axios.get('http://192.168.1.254:8003/store/get-store-notification?store_ids[]=' + storeId)
      .catch((e) => { console.log(e.stack) })

    return data
  }
}
