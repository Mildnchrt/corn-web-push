// const { Bill } = require('../../response/models')
const { webPushNotification } = require('../../services/web-noti')
const { getUserByStoreId } = require('../../library/firestore')

module.exports = async function (req, res) {
  let usersNotDone = await webPushNotification.getUserNotComplete()
  let userCollections = await webPushNotification.setDataStoreCollections(usersNotDone)
  let usersSellsuki = await webPushNotification.getUserFromSellsuki(userCollections.storeIds)
  usersSellsuki.results.forEach((user, i) => {
    let stage = webPushNotification.getStage(user)
    let updateTime = new Date()
    webPushNotification.updateDataToFireStore(userCollections.data[i], user, stage, updateTime)
  })
  
  usersNotDone = await webPushNotification.getUserNotComplete()
  usersNotDone.forEach( (user) => {
    let result = webPushNotification.pushNotification(user)
  })
  return {
    success: 1, 
    message: 'success'
  }
}
