const { webPushNotification } = require('../../services/web-noti')

module.exports = async function () {
  // let usersNotDone = await webPushNotification.getUserNotComplete()  
  // let usersCollection = webPushNotification.setDataStoreCollections(usersNotDone)
  // let usersSellsuki = await webPushNotification.getUserFromSellsuki(usersCollection.storeIds)
  // let updateTime = new Date()

  // usersSellsuki.forEach((user, index) => {
  //   let stage = webPushNotification.getUserStage(user)   
  //   webPushNotification.updateDataToFirestore(usersCollection.data[index], user, stage, updateTime)
  // })
  
  // usersNotDone = await webPushNotification.getUserNotComplete()
  // usersNotDone.forEach((user) => {
  //   webPushNotification.pushNotification(user.data())
  // })

  // return {
  //   success: 1, 
  //   message: 'success'
  // }

  let usersNotDone = await webPushNotification.getUserNotComplete()  
  // console.log(usersNotDone)
  let usersSellsuki = await webPushNotification.getStoreFromSellsuki(usersNotDone)
  // console.log('promise usersSellsuki >>',usersSellsuki.map(res => res.store_id))

  // let updateTime = new Date()

  // let result = webPushNotification.updateFirestoreAndSendNotification(usersNotDone, usersSellsuki, updateTime)
  console.log('succes: 1')
}
