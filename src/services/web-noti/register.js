const firestore = require('../../library/firestore')
const onesignal = require('../../library/onesignal')
const sellsuki = require('../../library/sellsuki')
const webPushNotification = require('./cron')

module.exports = {
  isPlayer: async function (storeId) {
    return await firestore.getStoreById(storeId)
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data())
          return true
        } else {
          console.log('No such document!')
          return false
        }
      }).catch((error) =>{
        console.log(error)
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
      .then(function () {
        return {
          success: 1,
          message: 'Created success.'
        }
      })
      .catch(function () {
        return {
          success: 0,
          message: 'Fail to create.'
        }
      })
    return res
  }
}