const { webPushNotification } = require('../../../services/web-noti')
const userNotDone = [{storeID: '1'}, {storeId: '2'}]
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
webPushNotification.setDataStoreCollections = jest.fn().mockReturnValue({storeIds: '1,2', data: [{}, {}]})
webPushNotification.getUserFromSellsuki = jest.fn().mockReturnValue(userSellsuki)
webPushNotification.getStage = jest.fn()
webPushNotification.pushNotification = jest.fn()

const { cronController } = require('../../../controllers/web-noti')

describe('describe cronWebPush endpoint', () => {
  it ('cronWebPush', async () => {
    let result = await cronController('', '')

    expect(webPushNotification.getUserNotComplete.mock.calls.length).toBe(2)
    expect(webPushNotification.setDataStoreCollections.mock.calls.length).toBe(1)
    expect(webPushNotification.getUserFromSellsuki.mock.calls.length).toBe(1)
    expect(webPushNotification.getStage.mock.calls.length).toBe(2)
    expect(webPushNotification.pushNotification.mock.calls.length).toBe(2)
  })
})