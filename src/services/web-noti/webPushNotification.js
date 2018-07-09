const { getActiveUser, updateData }  = require('../../library/firestore')
const { getUser } = require('../../library/sellsuki')
const { sendNotification }  = require('../../library/onesignal')
const { constant } = require('../../config')

module.exports = {
  getUserNotComplete:  function () {
    // var activeUserData = await getActiveUser()
    return true
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

  getUserStage: async function (user) {
    console.log("useruseruser", user)
    let stage = ''
    if (user.count_product <= 1) {
      stage = constant.STAGE.PRODUCT
    } else if (user.count_store_payment_channel <= 0) {
      stage = constant.STAGE.PAYMENT
    } else if (user.count_store_shipping_type <= 1) {
      stage = constant.STAGE.SHIPPING
    }
    console.log("stage stage", stage)
    return stage
  },

  updateDataToFirestore:  function (userFirestore, userSellsuki, stage, updateTime) {
    let isComplete = false
    if (stage === '') {
      stage = constant.STAGE.SHIPPING
      isComplete = true
    }
    
    let data = this.changeDataFormat(
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
    // console.log(data)
     updateData(data.storeId, data)
  },

  pushNotification: function (user) {
    let heading, content
    // let url = ''
    
    if (user.dataOneSignal && user.dataOneSignal.language === 'th') {
      if (user.stage === constant.STAGE.PRODUCT) {
        heading = 'มาเริ่มสร้างสินค้าชิ้นแรก บนร้านค้าของคุณกัน!'
        content = 'เพิ่มสินค้าในระบบ Sellsuki เพื่อเริ่มการขายบนร้านค้าของคุณ'
      } else if (user.stage === constant.STAGE.SHIPPING) {
        heading = 'สร้างวิธีจัดส่งสินค้าตอนนี้ เพื่อเริ่มการขายบนร้านค้าของคุณ!'
        content = 'เพิ่มวิธีจัดส่งสินค้าพร้อมค่าจัดส่ง ให้ลูกค้าของคุณมีทางเลือกในการรับของ'
      } else if (user.stage === constant.STAGE.PAYMENT) {
        heading = 'ดูเหมือนว่าร้านค้าของคุณยังไม่มีช่องทางการชำระเงินนะ!'
        content = 'เพิ่มช่องทางชำระเงิน ช่วยให้ลูกค้าชำระเงินค่าสินค้าได้อย่างง่ายดาย'
      }
    } else {
      if (user.stage === constant.STAGE.PRODUCT) {
        heading = 'Ready to sell? let’s add your products first!'
        content = 'Add products into Sellsuki inventory to run your online store.'
      } else if (user.stage === constant.STAGE.SHIPPING) {
        heading = 'Have you added payment methods?'
        content = 'Provide your payment methods for money receiving.'
      } else if (user.stage === constant.STAGE.PAYMENT) {
        heading = 'Do not forget adding delivery options.'
        content = 'More delivery options, more customer satisfaction.'
      }
    }

    let message = {
      app_id: constant.ONESIGNAL.APP_ID,
      headings: { 'en': heading },
      contents: { 'en': content },
      include_player_ids: [ user.playerId ]
    }

    sendNotification(message)
    return 'success: 1'
  },
  
  changeDataFormat: function(storeId, playerId, isAllow, isComplete, stage, createAt, updateAt, dataOneSignal, dataSellsuki) {
    let data = {
      storeId: storeId || '',
      playerId: playerId || '',
      isAllow: isAllow || false,
      isComplete: isComplete || false,
      stage: stage || constant.STAGE.PRODUCT,
      creatAt: createAt || '',
      updateAt: updateAt || '',
      dataOneSignal: dataOneSignal || {},
      dataSellsuki: dataSellsuki || {}
    }
    console.log('>>>>>', data.stage)

    return data
  }
}
