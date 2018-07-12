const firestore = require('../../library/firestore')
const onesignal = require('../../library/onesignal')
const sellsuki = require('../../library/sellsuki')
const webPushNotification  = require('./webPushNotification')

module.exports = {
  isPlayer: async function (storeId) {
    return await firestore.getStoreById(storeId)
  },

  getPlayer: async function (playerId) {
    return await onesignal.getDevice(playerId)
  },

  getStoreNoti: async function (storeIds) {
    let data = await sellsuki.getStoreNoti(storeIds)
    return data.data.results[0]
  },
  
  createUser: async function (data) {
    let now = new Date()
    let user = await webPushNotification.userDataTransform({
      storeId: data.storeId,
      playerId: data.playerId,
      isAllowed: data.isAllowed,
      isCompleted: '',
      stage: '',
      createdAt: now,
      updatedAt: now,
      dataOneSignal: data.dataOneSignal,
      dataSellsuki: data.dataSellsuki
    })
    let res = await firestore.createStore(data.storeId, user)
    return res
  }
}