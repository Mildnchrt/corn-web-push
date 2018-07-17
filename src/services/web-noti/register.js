const firestore = require('../../library/firestore')
const onesignal = require('../../library/onesignal')
const sellsuki = require('../../library/sellsuki')
const webPushNotification = require('./webPushNotification')

module.exports = {
  isPlayer: function (storeId) {
    firestore.getStoreById(storeId)
    .then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data())
        return doc.data()
      }
    })
    .catch ((e) => {
      console.log('No such document!')
      return false
    })
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
    let user = await webPushNotification.storeDataTransform({
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