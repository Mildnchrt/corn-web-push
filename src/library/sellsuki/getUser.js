const axios = require('axios')
const { constant } = require('../../config')

module.exports = {
  async getUser (storeId) {
    const { data } = await axios.get(constant.MOCK.SELLSUKI_URL + storeId)
      .catch((e) => { console.log(e.stack) })
    return data
  }
}
