const { webPushNotification } = require('../../../services/web-noti')

const usersNotDone = [
  // { data: jest.fn().mockReturnValue({ storeId: '1' }) },
  // { data: jest.fn().mockReturnValue({ storeId: '2' }) }
  {storeId: '1' },
  {storeId: '2' }
]
let firestoreCollections = [
  [ {storeId: '1' },
    {storeId: '2' } ]
]
let storesSellsuki = [
  {store_id: '1'},
  {store_id: '2'}
]

webPushNotification.getUserNotComplete = jest.fn().mockReturnValue(usersNotDone)
webPushNotification.sliceStoreToCollection = jest.fn().mockReturnValue(firestoreCollections)
webPushNotification.getStoreFromSellsuki = jest.fn().mockReturnValue(storesSellsuki)
webPushNotification.updateFirestoreAndSendNotification = jest.fn()

const { cronController } = require('../../../controllers/web-noti')

describe('describe controller/cronWebPush endpoint', () => {
  test ('web push notification controller', async () => {
    let res = await cronController()
    expect(webPushNotification.getUserNotComplete.mock.calls.length).toBe(1)
    expect(webPushNotification.sliceStoreToCollection.mock.calls.length).toBe(1)
    expect(webPushNotification.getStoreFromSellsuki.mock.calls.length).toBe(1)
    expect(webPushNotification.updateFirestoreAndSendNotification.mock.calls.length).toBe(1)
    expect(res).toEqual({
      success: 1, 
      message: 'success'
    })
  })
})