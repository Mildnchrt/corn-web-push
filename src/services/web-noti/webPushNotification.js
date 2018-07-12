const firestore = require('../../library/firestore')
const sellsuki = require('../../library/sellsuki')
const onesignal  = require('../../library/onesignal')
const { constant } = require('../../config')

module.exports = {
  getActiveStore: async function () {
    let activeUserData = await firestore.getActiveUser()
    let returnData = []
    return new Promise(function(resolve, reject) {
      activeUserData.docs.forEach((user) => {
        returnData.push(user.data())
      })
      resolve(returnData)
    })
  },
  getStoreNoti: async function (store) {
    let res = await sellsuki.getStoreNoti(store)
    try {
      return res.data.results
    } catch (error) {
      console.log(error)
    }
  },
  concatStoreIds: function(stores) {
    return stores.map((store) => {
        return store.storeId
      }).join()
  },
  groupStores: function(stores) {
    let result = []
    while(stores.length > 0) {
      result.push(stores.slice(0, 10))
      stores = stores.slice(10)
    }
    return result
  },
  getStoteSellukiNoti: async function (stores) {
    let results = []
    for(i=0; i < stores.length; i++) {
      let storeIds = this.concatStoreIds(stores[i])
      let res = await this.getStoreNoti(storeIds)
      results.push(res)
    }
    return results.reduce((acc, val) => acc.concat(val), [])
  },
  updateStoreAndPushNoti: function(usersNotDone, storesSellsuki) {
    let stage = ''
    let now = new Date()
    // console.log(usersNotDone)
    for(let i=0; i<usersNotDone.length; i++) {
      let storeObj = storesSellsuki.find(obj => obj.store_id == usersNotDone[i].storeId)
      stage = this.getStoreStage(storeObj)
      this.updateStore(usersNotDone[i], storeObj, stage, now)
      if(stage !== constant.STAGE.COMPLETED.STAGE_NAME) {
        this.pushNotification(usersNotDone[i], stage)
      }
    }

  },
  getStoreStage: function (user) {
    let stage = ''
    if (user.count_product <= 1) {
      stage = constant.STAGE.PRODUCT.STAGE_NAME
    } else if (user.count_store_payment_channel <= 0) {
      stage = constant.STAGE.PAYMENT.STAGE_NAME
    } else if (user.count_store_shipping_type <= 1) {
      stage = constant.STAGE.SHIPPING.STAGE_NAME
    } else {
      stage = constant.STAGE.COMPLETED.STAGE_NAME
    }
    return stage
  },

  updateStore: function (store, storeSellsukiNoti, stage, updateTime) {
    let isCompleted = false
    if (stage === constant.STAGE.COMPLETED.STAGE_NAME) {
      isComplete = true
    }
    
    let data = this.storeDataTransform({ 
      storeId: storeSellsukiNoti.store_id, 
      playerId: store.playerId, 
      isAllowed: store.isAllowed, 
      isCompleted: isCompleted, 
      stage: stage,
      createdAt: store.createAt,
      updatedAt: updateTime,
      dataOneSignal: store.dataOneSignal,
      dataSellsuki: storeSellsukiNoti
    })

    firestore.updateData(data.storeId, data)
  },

  pushNotification: function (user, stage) {
    let heading, content
    if (user.dataOneSignal) {
      let userLanguage = user.dataOneSignal.language
      heading = constant.STAGE[stage][userLanguage].HEADING
      content = constant.STAGE[stage][userLanguage].CONTENT
    }
      
    onesignal.sendNotification({
      app_id: constant.ONESIGNAL.APP_ID,
      headings: { 'en': heading },
      contents: { 'en': content },
      include_player_ids: [ user.playerId ]
    })

    return {
      success: 1,
      message: 'success.'
    }
  },
  
  storeDataTransform: function (user) {
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
