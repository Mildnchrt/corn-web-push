const { getActiveUser, updateData }  = require('../../library/firestore')
const sellsuki = require('../../library/sellsuki')
const onesignal  = require('../../library/onesignal')
const { constant } = require('../../config')

module.exports = {
  getUserNotComplete: async function () {
    let activeUserData = await getActiveUser()
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
      return user.results
    } catch (error) {
      console.log(error)
    }
  },

  getUserStage: function (user) {
    let stage = ''
    if (user.count_product <= 1) {
      stage = constant.STAGE.PRODUCT
    } else if (user.count_store_payment_channel <= 0) {
      stage = constant.STAGE.PAYMENT
    } else if (user.count_store_shipping_type <= 1) {
      stage = constant.STAGE.SHIPPING
    }
    return stage
  },

  updateDataToFirestore: function (userFirestore, userSellsuki, stage, updateTime) {
    let isComplete = false
    if (stage === '') {
      stage = constant.STAGE.SHIPPING
      isComplete = true
    }
    let data = this.userDataTransform({ 
      storeId: userSellsuki.store_id, 
      playerId: userFirestore.playerId, 
      isAllowed: userFirestore.isAllow, 
      isCompleted: isComplete, 
      stage: stage,
      createdAt: userFirestore.createAt,
      updatedAt: updateTime,
      dataOneSignal: userFirestore.dataOneSignal,
      userSellsuki: userSellsuki 
    })

    updateData(data.storeId, data)
  },

  pushNotification: function (user) {
    let heading, content
    // let url = ''
    let a = {}
    a[constant.STAGE.PRODUCT]
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

    onesignal.sendNotification(message)
    return 'success: 1'
  },
  
  userDataTransform: function (user) {
    return {
      storeId: user && user.storeId || '',
      playerId: user && user.playerId || '',
      isAllowed: user && user.isAllow || false,
      isCompleted: user && user.isComplete || false,
      stage: user && user.stage || constant.STAGE.PRODUCT,
      createdAt: user && user.createAt || '',
      updatedAt: user && user.updateAt || '',
      dataOneSignal: user && user.dataOneSignal || {},
      dataSellsuki: user && user.dataSellsuki || {}
    }
  }
}
