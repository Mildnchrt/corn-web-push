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

webPushNotification.getActiveStore = jest.fn().mockReturnValue(usersNotDone)
webPushNotification.groupStores = jest.fn().mockReturnValue(firestoreCollections)
webPushNotification.getStoteSellukiNoti = jest.fn().mockReturnValue(storesSellsuki)
webPushNotification.updateStoreAndPushNoti = jest.fn()

const { cronController } = require('../../../controllers/web-noti')

describe('describe controller/cronWebPush endpoint', () => {
  test ('web push notification controller', async () => {
    let res = await cronController()
    expect(webPushNotification.getActiveStore.mock.calls.length).toBe(1)
    expect(webPushNotification.groupStores.mock.calls.length).toBe(1)
    expect(webPushNotification.getStoteSellukiNoti.mock.calls.length).toBe(1)
    expect(webPushNotification.updateStoreAndPushNoti.mock.calls.length).toBe(1)
    expect(res).toEqual({
      success: 1, 
      message: 'success'
    })
  })
})