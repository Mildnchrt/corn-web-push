const { webPushNotification } = require('../../services/web-noti')
const { getUserByStoreId } = require('../../library/firestore')

const cronController  = async (request, response)  => {
  let usersNotDone = await webPushNotification.getUserNotComplete()
  let usersCollection = await webPushNotification.setDataStoreCollections(usersNotDone)
  let usersSellsuki = await webPushNotification.getUserFromSellsuki(usersCollection.storeIds)


  usersSellsuki.results.forEach(  (user, index) => {
  //  console.log("user", webPushNotification.getUserStage)
    let stage =   webPushNotification.getUserStage(user)
    console.log("stage", stage)
    let updateTime = new Date()
     webPushNotification.updateDataToFirestore(usersCollection.data[index], user, stage, updateTime)
  })
  
  usersNotDone =  webPushNotification.getUserNotComplete()
  usersNotDone.forEach((user) => {
    // console.log('usersNotDone', webPushNotification.pushNotification)
     webPushNotification.pushNotification(user)
    
  })

  return {
    success: 1, 
    message: 'success'
  }
}

module.exports = {
  cronController
}
