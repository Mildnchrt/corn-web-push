const { getUserByStoreId, createData } = require('../../library/firestore')
const { getDevice } = require('../../library/onesignal')
const { getUser } = require('../../library/sellsuki')
const webPushNotification  = require('./webPushNotification')

module.exports = {
  checkPlayerFirestore: async function (storeId) {
    let result = await getUserByStoreId.getUserByStoreId(storeId)
    if (!result) {
      return false
    } else { 
      return true
    }
  },
  
  createNewUser: async function (storeId, playerId, isAllow, updateTime) {
    let promiseOneSignal = getDevice.getDevice(playerId)
    let promiseSellsuki = getUser.getUser(storeId)
    let userOneSignal = await promiseOneSignal
    let userSellsuki = await promiseSellsuki

    let data = webPushNotification.changeDataFormat(
      storeId, 
      playerId, 
      isAllow, 
      '', 
      '', 
      updateTime, 
      updateTime, 
      userOneSignal, 
      userSellsuki.data.results
    )

    let responseCreateData = await createData.createData(storeId, data)
    return responseCreateData
  }
}