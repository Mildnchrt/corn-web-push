const libFirestore  = require('../../../library/firestore')
const sellsuki = require('../../../library/sellsuki')
const libOnesignal = require('../../../library/onesignal')

// mock return value function
sellsuki.getUser = jest.fn().mockReturnValue({ data: { results: {} } })
libFirestore.getActiveUser = jest.fn().mockReturnValue({})
libOnesignal.sendNotification = jest.fn()
libFirestore.updateData = jest.fn()

const { webPushNotification } = require('../../../services/web-noti')

describe('describe webPushnotification endpoint', () => {
  it ('get user stage', () => {
    let user = {
      count_product: 1
    }
    expect(webPushNotification.getStage(user)).toEqual('product')
  })

  it ('sent null data to change data format', () => {
    
    let input = {
      storeId: '',
      playerId: '',
      isAllow: null,
      isComplete: null,
      stage: '',
      creatAt: '',
      updateAt: '',
      dataOneSignal: null,
      dataSellsuki: null
    }

    let output = {
      storeId: '',
      playerId: '',
      isAllow: false,
      isComplete: false,
      stage: 'product',
      creatAt: '',
      updateAt: '',
      dataOneSignal: {},
      dataSellsuki: {}
    }

    expect(webPushNotification.changeDataFormat(input)).toEqual(output)
  })

  it.only('sent data to change data format', () => {
    let data = webPushNotification.changeDataFormat('01', '01', false, false, '', 'today', '', null, {test: 'test'})
    let output = {
      storeId: '01',
      playerId: '01',
      isAllow: false,
      isComplete: false,
      stage: 'product',
      creatAt: 'today',
      updateAt: '',
      dataOneSignal: {},
      dataSellsuki: {test: 'test'}
    }
    console.log('>>>> 1', data)
    expect(data).toEqual(output)
  })

  it ('get user from sellsuki data', async () => {
    await webPushNotification.getUserFromSellsuki('1')
    expect(sellsuki.getUser.mock.calls.length).toBe(1)
  })

  it ('update data to Firestore', () => {
    let userFirestore = {}
    let userSellsuki = {}
    let stage = ''
    let isComplete = ''
    let time = ''

    let result = webPushNotification.updateDataToFirestore(userFirestore, userSellsuki, stage, time)
    console.log('result ', libFirestore.updateData.mock.length)
    
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

  it ('set data store collections', async () => {
    let userNotDone = {}
    expect(webPushNotification.setDataStoreCollections(userNotDone)).toEqual({})
  })
})
