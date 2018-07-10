const { webPushNotification } = require('../../services/web-noti')
const { getUserByStoreId } = require('../../library/firestore')
const { getUser } = require('../../library/sellsuki')

module.exports = async function (request, response) {
  let usersNotDone = await webPushNotification.getUserNotComplete()
  let usersCollection = webPushNotification.setDataStoreCollections(usersNotDone)
  let usersSellsuki = await webPushNotification.getUserFromSellsuki(usersCollection.storeIds)

  usersSellsuki.forEach((user, index) => {
    let stage = webPushNotification.getUserStage(user)    
    let updateTime = new Date()
    webPushNotification.updateDataToFirestore(usersCollection.data[index], user, stage, updateTime)
  })
  
  usersNotDone = await webPushNotification.getUserNotComplete()
  usersNotDone.forEach((user) => {
    webPushNotification.pushNotification(user.data())
  })

  return {
    success: 1, 
    message: 'success'
  }
}
