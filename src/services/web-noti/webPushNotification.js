const { getActiveUser, updateData }  = require('../../library/firestore')
const { getUser } = require('../../library/sellsuki')
const { sendNotification }  = require('../../library/onesignal')
const { STAGE, ONESIGNAL } = require('../../config/constant')

module.exports = {
  getUserNotComplete: function () {
    var activeUserData = getActiveUser()
    return activeUserData
  },

  setDataStoreCollections: function (userNotDone) {
    var str = ''
    var isFirst = true
    var userCollections = {}
    var userData = []
    
    if (Object.keys(userNotDone).length !== 0) {
      userNotDone.forEach((collections) => {
        if (isFirst) {
          str += collections.data().storeId
          isFirst = false
        } else {
          str += ',' + collections.data().storeId
        }
        userData.push(collections.data())
      })
      userCollections = {
        storeIds: str,
        data: userData
      }
    } else {
      return {}
    }

    return userCollections
  },

  getUserFromSellsuki: async function (store) {
    var user = await getUser(store)
    return user.data.results
  },

  getStage: function (user) {
    let stage = ''
    if (user.count_product <= 1) {
      stage = STAGE.PRODUCT
    } else if (user.count_store_payment_channel <= 0) {
      stage = STAGE.PAYMENT
    } else if (user.count_store_shipping_type <= 1) {
      stage = STAGE.SHIPPING
    }

    return stage
  },

  updateDataToFireStore: function (userFirestore, userSellsuki, stage, updateTime) {
    let isComplete = false
    if (stage === '') {
      stage = STAGE.SHIPPING
      isComplete = true
    }
    
    let transferData = this.transferData(
      userSellsuki.store_id, 
      userFirestore.playerId, 
      userFirestore.isAllow, 
      isComplete, 
      stage,
      userFirestore.creatAt,
      updateTime,
      userFirestore.dataOneSignal,
      userSellsuki
    )
    
    updateData(transferData.storeId, transferData)
  },

  pushNotification: function (user) {
    let heading, content
    // let url = ''
    
    if (user.dataOneSignal && user.dataOneSignal.language === 'th') {
      if (user.stage === STAGE.PRODUCT) {
        heading = 'อยากเริ่มขาย ต้องเพิ่มสินค้าก่อนนะ!'
        content = 'เริ่มการขายผ่าน Sellsuki โดยการเพิ่มสินค้าในสต๊อกสินค้า'
      } else if (user.stage === STAGE.SHIPPING) {
        heading = 'เพิ่มช่องทางชำระเงินสำหรับลูกค้าหรือยัง?'
        content = 'เพิ่มบัญชีธนาคารหรือช่องทางอื่นๆ เพื่อรับชำระเงินจากลูกค้าหลังยืนยันออเดอร์'
      } else if (user.stage === STAGE.PAYMENT) {
        heading = 'อย่าลืมเพิ่มวิธีจัดส่งและค่าส่งสินค้าด้วยนะ'
        content = 'เพิ่มวิธีจัดส่งสินค้าพร้อมค่าจัดส่งแบบต่างๆ ให้ลูกค้าเลือกรับของได้ตามสะดวก'
      }
    } else {
      if (user.stage === STAGE.PRODUCT) {
        heading = 'Ready to sell? let’s add your products first!'
        content = 'Add products into Sellsuki inventory to run your online store.'
      } else if (user.stage === STAGE.SHIPPING) {
        heading = 'Have you added payment methods?'
        content = 'Provide your payment methods for money receiving.'
      } else if (user.stage === STAGE.PAYMENT) {
        heading = 'Do not forget adding delivery options.'
        content = 'More delivery options, more customer satisfaction.'
      }
    }

    var message = {
      app_id: ONESIGNAL.APP_ID,
      headings: { 'en': heading },
      contents: { 'en': content },
      include_player_ids: [ user.playerId ]
    }

    sendNotification(message)

    return 'success: 1'
  },

  transferData: function(storeId, playerId, isAllow, isComplete, stage, creatAt, updateAt, dataOneSignal, dataSellsuki) {
    return transferedData = {
      storeId: (storeId !== '' && storeId !== undefined ? storeId : ''),
      playerId: (playerId !== null && playerId !== undefined ? playerId : ''),
      isAllow: (isAllow !== null && isAllow !== undefined ? isAllow : false),
      isComplete: (isComplete !== null ? isComplete : false),
      stage: (stage !== '' ? stage : STAGE.PRODUCT),
      creatAt: (creatAt !== undefined ? creatAt : ''),
      updateAt: (updateAt !== undefined ? updateAt : ''),
      dataOneSignal: (dataOneSignal !== null && dataOneSignal !== undefined ? dataOneSignal : {}),
      dataSellsuki: (dataSellsuki !== null ? dataSellsuki : {})
    }
  }
}
