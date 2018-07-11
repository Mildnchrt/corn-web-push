const { fetch } = require('./http_request')


module.exports = {
  async getStoreNoti (storeId) {
    return await fetch(constant.MOCK.SELLSUKI_URL + storeId)
      .catch((e) => { 
        console.log(e.stack) 
      })
  }
}
