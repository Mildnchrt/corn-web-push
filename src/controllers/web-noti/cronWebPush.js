const { webPushNotification } = require('../../services/web-noti')
const { getUserByStoreId } = require('../../library/firestore')

module.exports = async function (request, response) {
  let usersNotDone = await webPushNotification.getUserNotComplete()
  let usersCollection = await webPushNotification.setDataStoreCollections(usersNotDone)
  let usersSellsuki = await webPushNotification.getUserFromSellsuki(usersCollection.storeIds)

  usersSellsuki.results.forEach((user, index) => {
    let stage = webPushNotification.getStage(user)
    let updateTime = new Date()
    webPushNotification.updateDataToFirestore(usersCollection.data[index], user, stage, updateTime)
  })
  
  usersNotDone = await webPushNotification.getUserNotComplete()
  usersNotDone.forEach((user) => {
    webPushNotification.pushNotification(user)
  })

  return {
    success: 1, 
    message: 'success'
  }
}
