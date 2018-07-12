const firestore = require('../../library/firestore')
const sellsuki = require('../../library/sellsuki')
const onesignal  = require('../../library/onesignal')
const { constant } = require('../../config')

module.exports = {
  getUserNotComplete: async function () {
    let activeUserData = await firestore.getActiveUser()
    let returnData = []
    return new Promise(function(resolve, reject) {
      activeUserData.docs.forEach((user) => {
        returnData.push(user.data())
      })
      resolve(returnData)
    })
  },
  getUserFromSellsuki: async function (store) {
    let user = await sellsuki.getStoreNoti(store)
    try {
      return user.data.results
    } catch (error) {
      console.log(error)
    }
  },
  mapStoreIdToString: function(storesCollection) {
    return storesCollection.map((store) => {
        return store.storeId
      }).join()
  },
  sliceStoreToCollection: function(usersNotDone) {
    let storeCollections = []
    while(usersNotDone.length > 0) {
      storeCollections.push(usersNotDone.slice(0, 10))
      usersNotDone = usersNotDone.slice(10)
    }
    return storeCollections
  },
  getStoreFromSellsuki: async function (storeCollections) {
    let results = []
  
    for(i=0; i<storeCollections.length; i++) {
      let str = this.mapStoreIdToString(storeCollections[i])
      let data = await this.getUserFromSellsuki(str)
      results.push(data)
    }

    return results.reduce((acc, val) => acc.concat(val), [])
  },
  updateFirestoreAndSendNotification: function(usersNotDone, storesSellsuki, updateTime) {
    let stage = ''
    console.log(usersNotDone)
    for(let i=0; i<usersNotDone.length; i++) {
      let storeObj = storesSellsuki.find(obj => obj.store_id == '8')
      stage = this.getUserStage(storeObj)
      this.updateDataToFirestore(usersNotDone[i], storeObj, stage, updateTime)

      if(stage !== '') {
        this.pushNotification(usersNotDone[i], stage)
      }
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

  pushNotification: function (user, stage) {
    let heading, content
    let userLanguage

    if (user.dataOneSignal) {
      userLanguage = user.dataOneSignal.language

      heading = constant.STAGE[stage][userLanguage].HEADING
      content = constant.STAGE[stage][userLanguage].CONTENT
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
