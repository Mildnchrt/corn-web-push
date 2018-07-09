const axios = require('axios')
const { constant } = require('../../config')

module.exports = {
  async getDevice (playerId) {
    const { data } = await axios.get('https://onesignal.com/api/v1/players/' + playerId + '?app_id=' + constant.ONESIGNAL.APP_ID)
      .catch((e) => { console.log(e.stack) })

    return data
  }
}
