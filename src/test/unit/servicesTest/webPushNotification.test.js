const libFirestore  = require('../../../library/firestore')
const sellsuki = require('../../../library/sellsuki')
const libOnesignal = require('../../../library/onesignal')

sellsuki.getStoreNoti= jest.fn().mockReturnValue({ data: { results: {} } })
libFirestore.getActiveUser = jest.fn().mockReturnValue({})
libOnesignal.sendNotification = jest.fn()
libFirestore.updateData = jest.fn()
const { webPushNotification } = require('../../../services/web-noti')

describe('describe services/webPushnotification endpoint', () => {
  test ('get user stage', async () => {
    let user = {
      count_product: 1
    }

    let output = {
      STAGE_NAME: 'PRODUCT'
    }

    expect(webPushNotification.getUserStage(user)).toEqual(output.STAGE_NAME)
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

    expect(webPushNotification.userDataTransform(input)).toEqual(output)
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

    expect(webPushNotification.userDataTransform(input)).toEqual(output)
  })

  test ('get user from sellsuki data', async () => {
    await webPushNotification.getUserFromSellsuki('1')
    expect(sellsuki.getStoreNoti.mock.calls.length).toBe(1)
  })

  test ('update data to Firestore', () => {
    let userFirestore = {}
    let userSellsuki = {}
    let stage = ''
    let isCompleted = ''
    let time = ''
    let result = webPushNotification.updateDataToFirestore(userFirestore, userSellsuki, stage, time)
    
    expect(libFirestore.updateData.mock.calls.length).toBe(1)
  })

  test ('get user not complete', async () => {
    await webPushNotification.getUserNotComplete()
    expect(libFirestore.getActiveUser.mock.calls.length).toBe(1)
  })

  test ('push notification', async () => {
    let user = {}
    let result = webPushNotification.pushNotification(user)

    expect(libOnesignal.sendNotification.mock.calls.length).toBe(1)
  })

  test ('set data store collections is empty', async () => {
    let userNotDone = { 
      docs: []
     }

    expect(webPushNotification.setDataStoreCollections(userNotDone)).toEqual({})
  })

  test ('set data store collections', async () => {
    let userNotDone = {
      docs: [
        { data: jest.fn().mockReturnValue({ storeId: '1' }) },
        { data: jest.fn().mockReturnValue({ storeId: '2' }) }
      ]
    }

    let output = {
      'data': 
        [ { 'storeId': '1' }, 
        { 'storeId': '2' } ], 
      'storeIds': '1,2'
    }

    expect(webPushNotification.setDataStoreCollections(userNotDone)).toEqual(output)
  })
})
