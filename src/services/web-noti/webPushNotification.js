const firestore = require('../../library/firestore')
const sellsuki = require('../../library/sellsuki')
const onesignal  = require('../../library/onesignal')
const { constant } = require('../../config')

module.exports = {
  getUserNotComplete: async function () {
    let activeUserData = await firestore.getActiveUser()
    return activeUserData
  },

  setDataStoreCollections: function (userNotDone) {    
    let userCollections = {}

    if (userNotDone.docs.length > 0) {      
      let userData = []
      let str = userNotDone.docs.map((collections) => {
        userData.push(collections.data())
        return collections.data().storeId
      }).join()

      userCollections = {
        storeIds: str,
        data: userData
      }
    } 
    return userCollections
  },

  getUserFromSellsuki: async function (store) {
    let user = await sellsuki.getStoreNoti(store)    
    try {
      return user.data.results
    } catch (error) {
      console.log(error)
    }
  },

  getUserStage: function (user) {
    let stage = ''
    if (user.count_product <= 1) {
      stage = constant.STAGE.PRODUCT.STAGE_NAME
    } else if (user.count_store_payment_channel <= 0) {
      stage = constant.STAGE.PAYMENT.STAGE_NAME
    } else if (user.count_store_shipping_type <= 1) {
      stage = constant.STAGE.SHIPPING.STAGE_NAME
    }
    return stage
  },

  updateDataToFirestore: function (userFirestore, userSellsuki, stage, updateTime) {
    let isCompleted = false
    if (stage === '') {
      stage = constant.STAGE.SHIPPING.STAGE_NAME
      isComplete = true
    }
    
    let data = this.userDataTransform({ 
      storeId: userSellsuki.store_id, 
      playerId: userFirestore.playerId, 
      isAllowed: userFirestore.isAllowed, 
      isCompleted: isCompleted, 
      stage: stage,
      createdAt: userFirestore.createAt,
      updatedAt: updateTime,
      dataOneSignal: userFirestore.dataOneSignal,
      dataSellsuki: userSellsuki
    })

    firestore.updateData(data.storeId, data)
  },

  pushNotification: function (user) {
    let heading, content
    let userStage, userLanguage

    if (user.dataOneSignal) {
      userStage = user.stage
      userLanguage = user.dataOneSignal.language

      heading = constant.STAGE[userStage][userLanguage].HEADING
      content = constant.STAGE[userStage][userLanguage].CONTENT
    }
    
    let message = {
      app_id: constant.ONESIGNAL.APP_ID,
      headings: { 'en': heading },
      contents: { 'en': content },
      include_player_ids: [ user.playerId ]
    }

    onesignal.sendNotification(message)
    return 'success: 1'
  },
  
  userDataTransform: function (user) {
    return {
      storeId: user && user.storeId || '',
      playerId: user && user.playerId || '',
      isAllowed: user && user.isAllowed || false,
      isCompleted: user && user.isCompleted || false,
      stage: user && user.stage || constant.STAGE.PRODUCT.STAGE_NAME,
      createdAt: user && user.createdAt || '',
      updatedAt: user && user.updatedAt || '',
      dataOneSignal: user && user.dataOneSignal || {},
      dataSellsuki: user && user.dataSellsuki || {}
    }
  }
}
