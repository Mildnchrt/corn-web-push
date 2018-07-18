const { webPushNotification } = require('../../services/web-noti')

module.exports = async function () {
  
  let stores = await webPushNotification.getActiveStore()
  let storeCollections = webPushNotification.groupStores(stores)
  let storesSellsukiNoti = await webPushNotification.getStoreSellukiNoti(storeCollections)
  webPushNotification.updateStoreAndPushNoti(stores, storesSellsukiNoti)
  return {
    success: 1, 
    message: 'success'
  }
}