const { fetch } = require('./http_request')
const { constant } = require('../../config')

module.exports = {
  async getStoreNoti (storeId) {
    return await fetch(constant.SERVER.SELLSUKI_URL + storeId)
      .catch((e) => { 
        console.log(e.stack) 
      })
  }
}
