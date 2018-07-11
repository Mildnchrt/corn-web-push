const libFirestore  = require('../../../library/firestore')
const sellsuki = require('../../../library/sellsuki')
const libOnesignal = require('../../../library/onesignal')

// mock return value function
sellsuki.getStoreNoti= jest.fn().mockReturnValue({ data: { results: {} } })
libFirestore.getActiveUser = jest.fn().mockReturnValue({})
libOnesignal.sendNotification = jest.fn()
libFirestore.updateData = jest.fn()
const { webPushNotification } = require('../../../services/web-noti')

describe('describe webPushnotification endpoint', () => {
  it ('get user stage', async () => {
    let user = {
      count_product: 1
    }

    expect(webPushNotification.getUserStage(user)).toEqual('product')
  })

  it ('sent null data to change data format', () => {
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
      stage: 'product',
      createdAt: '',
      updatedAt: '',
      dataOneSignal: {},
      dataSellsuki: {}
    }

    expect(webPushNotification.userDataTransform(input)).toEqual(output)
  })

  it ('sent data to change data format', () => {
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
      stage: 'product',
      createdAt: 'today',
      updatedAt: '',
      dataOneSignal: {},
      dataSellsuki: { test: 'test' }
    }

    expect(webPushNotification.userDataTransform(input)).toEqual(output)
  })

  it ('get user from sellsuki data', async () => {
    await webPushNotification.getUserFromSellsuki('1')
    expect(sellsuki.getStoreNoti.mock.calls.length).toBe(1)
  })

  it ('update data to Firestore', () => {
    let userFirestore = {}
    let userSellsuki = {}
    let stage = ''
    let isCompleted = ''
    let time = ''
    let result = webPushNotification.updateDataToFirestore(userFirestore, userSellsuki, stage, time)
    
    expect(libFirestore.updateData.mock.calls.length).toBe(1)
  })

  it ('get user not complete', async () => {
    await webPushNotification.getUserNotComplete()
    expect(libFirestore.getActiveUser.mock.calls.length).toBe(1)
  })

  it ('push notification', async () => {
    let user = {}
    let result = webPushNotification.pushNotification(user)

    expect(libOnesignal.sendNotification.mock.calls.length).toBe(1)
  })

  it ('set data store collections is empty', async () => {
    let userNotDone = { 
      docs: []
     }
    expect(webPushNotification.setDataStoreCollections(userNotDone)).toEqual({})
  })

  it ('set data store collections', async () => {
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
