const { getUserByStoreId, createData } = require('../../library/firestore')
const { getDevice } = require('../../library/onesignal')
const { getUser } = require('../../library/sellsuki')
const webPushNotification  = require('./webPushNotification')

module.exports = {
  checkPlayerFirestore: async function (storeId) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>hello')
    const result = await getUserByStoreId.getUserByStoreId(storeId)
    if (!result) {
      return false
    } else { 
      return true
    }
  },
  
  createNewUser: async function (storeId, playerId, isAllow, updateTime) {
    let userOneSignal = await getDevice.getDevice(playerId)
    let userSellsuki = await getUser.getUser(storeId)
    let data = webPushNotification.transferData(
      storeId, 
      playerId, 
      isAllow, 
      '', 
      '', 
      updateTime, 
      updateTime, 
      userOneSignal, 
      //userSellsuki.data.results.results[0]
      userSellsuki.data.results
    )

    const resCreateData = await createData.createData(storeId, data)
    return resCreateData
  }
}