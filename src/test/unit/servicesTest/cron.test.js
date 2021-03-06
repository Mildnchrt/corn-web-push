const libFirestore  = require('../../../library/firestore')
const sellsuki = require('../../../library/sellsuki')
const libOnesignal = require('../../../library/onesignal')

// sellsuki.getStoreNoti = jest.fn().mockReturnValue({ data: { results: {} } })
libFirestore.getActiveUser = jest.fn().mockReturnValue({})
libOnesignal.sendNotification = jest.fn()
libFirestore.updateData = jest.fn()
sellsuki.getStoreNoti = jest.fn()

const { webPushNotification } = require('../../../services/web-noti')
webPushNotification.concatStoreIds = jest.fn().mockReturnValue('1')
webPushNotification.getStoreNoti = jest.fn().mockReturnValue([{store_id: 1}])
webPushNotification.getActiveStore = jest.fn().mockReturnValue({})


describe('describe services/webPushnotification endpoint', () => {
  test ('get user stage', async () => {
    let user = {
      count_product: 1
    }

    let output = {
      STAGE_NAME: 'PRODUCT'
    }

    expect(webPushNotification.getStoreStage(user)).toEqual(output.STAGE_NAME)
  })

  test ('sent null data to change data format', () => {
    let input = {
      storeId: '',
      playerId: '',
      isAllowed: null,
      isCompleted: null,
      stage: '',
      createdAt: '',
      updatedAt: '',
      dataOneSignal: null,
      dataSellsuki: null
    }

    let output = {
      storeId: '',
      playerId: '',
      isAllowed: false,
      isCompleted: false,
      stage: 'PRODUCT',
      createdAt: '',
      updatedAt: '',
      dataOneSignal: {},
      dataSellsuki: {}
    }

    expect(webPushNotification.storeDataTransform(input)).toEqual(output)
  })

  test ('sent data to change data format', () => {
    let input = {
      storeId: '01', 
      playerId: '01', 
      isAllowed: false, 
      isCompleted: false, 
      stage: '', 
      createdAt: 'today', 
      updatedAt: '', 
      datOneSignale: null, 
      dataSellsuki: { test: 'test' }
    }

    let output = {
      storeId: '01',
      playerId: '01',
      isAllowed: false,
      isCompleted: false,
      stage: 'PRODUCT',
      createdAt: 'today',
      updatedAt: '',
      dataOneSignal: {},
      dataSellsuki: { test: 'test' }
    }

    expect(webPushNotification.storeDataTransform(input)).toEqual(output)
  })
  test ('getStoreNoti function', async () => {
    let results = await webPushNotification.getStoreNoti('1')
    let expectedData = [{store_id: 1}]

    expect(results).toEqual(expectedData)
  })

  test ('getStoteSellukiNoti function', async () => {
    let results = await webPushNotification.getStoreSellukiNoti([[{storeId: '1'}]])
    let expectedData = [{store_id: 1}]

    expect(webPushNotification.concatStoreIds.mock.calls.length).toBe(1)
    expect(webPushNotification.getStoreNoti.mock.calls.length).toBe(2)
    expect(results).toEqual(expectedData)
  })

  test ('update data to Firestore', () => {
    let userFirestore = {}
    let userSellsuki = {}
    let stage = ''
    let isCompleted = ''
    let time = ''
    let result = webPushNotification.updateStore(userFirestore, userSellsuki, stage, time)
    
    expect(libFirestore.updateData.mock.calls.length).toBe(1)
  })

  test ('get user not complete', async () => {
    let results = await webPushNotification.getActiveStore()
    let expectedData = {}

    // expect(libFirestore.getActiveUser.mock.calls.length).toBe(2)
    expect(results).toEqual(expectedData)
  })

  test ('push notification', async () => {
    let user = {}
    let result = webPushNotification.pushNotification(user)

    expect(libOnesignal.sendNotification.mock.calls.length).toBe(1)
  })
})
