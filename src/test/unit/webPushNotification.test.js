const { webPushNotification } = require('../../services/web-noti')
const libFirestore  = require('../../library/firestore')
const sellsuki = require('../../library/sellsuki')
sellsuki.getUser = jest.fn()



describe('describe webPushnotification endpoint', () => {
  it('getStage', () => {
    console.log('check user are in product stage')
    let user = {
      count_product: 1
    }
    expect(webPushNotification.getStage(user)).toEqual('product')
  })

  it('sent null data to transferData', () => {
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

  it('sent data to transferData', () => {
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
  it.only('getUserFromSellsuki', async () => {
    // test.getActiveUser = jest.fn().mockReturnValue(true)
    // sellsuki.getUser = jest.fn().mockReturnValue({data: {results: {}}})
    await webPushNotification.getUserFromSellsuki('1')

    console.log('mock', sellsuki.getUser)
    expect(sellsuki.getUser.mock.calls.length).toBe(1)
  })
})
