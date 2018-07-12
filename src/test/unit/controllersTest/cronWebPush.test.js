const { webPushNotification } = require('../../../services/web-noti')

const userNotDone = [
  { data: jest.fn().mockReturnValue({ storeId: '1' }) },
  { data: jest.fn().mockReturnValue({ storeId: '2' }) }
]
let dataStore = {
  storeIds: '1,2', 
  data: [
    {}, 
    {}
  ]
}
const userSellsuki = {
  results: [
    {
      "store_name": "example store",
      "store_id": "1",
      "count_product": "319",
      "count_store_shipping_type": "8",
      "count_store_payment_channel": "10"
    },
    {
      "store_name": "Nariste Boutique",
      "store_id": "2",
      "count_product": "11",
      "count_store_shipping_type": "2",
      "count_store_payment_channel": "6"
    }
  ]
}

webPushNotification.getUserNotComplete = jest.fn().mockReturnValue(userNotDone)
webPushNotification.setDataStoreCollections = jest.fn().mockReturnValue(dataStore)
webPushNotification.getUserFromSellsuki = jest.fn().mockReturnValue(userSellsuki.results)
webPushNotification.updateDataToFirestore = jest.fn()
webPushNotification.getUserStage = jest.fn()
webPushNotification.pushNotification = jest.fn()

const { cronController } = require('../../../controllers/web-noti')

describe('describe cronWebPush endpoint', () => {
  test ('cronWebPush', async () => {
    let res = await cronController()
    expect(webPushNotification.getUserNotComplete.mock.calls.length).toBe(2)
    expect(webPushNotification.setDataStoreCollections.mock.calls.length).toBe(1)
    expect(webPushNotification.getUserFromSellsuki.mock.calls.length).toBe(1)
    expect(webPushNotification.getUserStage.mock.calls.length).toBe(2)
    expect(webPushNotification.pushNotification.mock.calls.length).toBe(2)
    expect(res).toEqual({
      success: 1, 
      message: 'success'
    })
  })
})