const { webPushNotification } = require('../../services/web-noti')

module.exports = async function () {
  let updateTime = new Date()
  let usersNotDone = await webPushNotification.getUserNotComplete()
  let storeCollections = webPushNotification.sliceStoreToCollection(usersNotDone)
  let storesSellsuki = await webPushNotification.getStoreFromSellsuki(storeCollections)
  webPushNotification.updateFirestoreAndSendNotification(usersNotDone, storesSellsuki, updateTime)
  return {
    success: 1, 
    message: 'success'
  }
}