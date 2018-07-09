const firestore = require('../../../library/firestore')
const sellsuki = require('../../../library/sellsuki')

sellsuki.getUser = jest.fn().mockReturnValue({ data: { results: {} } })
firestore.updateData = jest.fn()

const { webPushNotification } = require('../../../services/web-noti')

describe('describe webPushnotification endpoint', () => {
  it ('get user stage', () => {
    let user = {
      count_product: 1
    }
    expect(webPushNotification.getStage(user)).toEqual('product')
  })

  it ('sent null data to transferData', () => {
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
    expect(webPushNotification.transferData('', '', null, null, '', '', '', null, null)).toEqual(output)
  })

  it ('sent data to transferData', () => {
    let data = webPushNotification.transferData('01', '01', false, false, '', 'today', '', {test: 'test'}, {test: 'test'})

    let output = {
      storeId: '01',
      playerId: '01',
      isAllow: false,
      isComplete: false,
      stage: 'product',
      creatAt: 'today',
      updateAt: '',
      dataOneSignal: {test: 'test'},
      dataSellsuki: {test: 'test'}
    }
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

    let result = webPushNotification.updateDataToFireStore(userFirestore, userSellsuki, stage, time)
    expect(firestore.updateData.mock.calls.length).toBe(1)
  })
})
