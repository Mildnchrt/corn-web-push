const libFirestore = require('../../../library/firestore')
const libOnesignal = require('../../../library/onesignal')
const libSellsuki = require('../../../library/sellsuki')
const webPushNotification  = require('../../../services/web-noti/cron')

libFirestore.createStore = jest.fn().mockResolvedValue({})
libOnesignal.getDevice = jest.fn().mockReturnValue({ response: { data: {} } })
libSellsuki.getStoreNoti= jest.fn().mockReturnValue({ data: { results: {} } })
libFirestore.getStoreById = jest.fn().mockResolvedValueOnce({data: {function () {}}, exists: 0}).mockResolvedValueOnce({data: {function () {}}, exists: 1})
webPushNotification.storeDataTransform = jest.fn().mockReturnValue({})

const { isPlayer, createUser, getPlayer, getStoreNoti } = require('../../../services/web-noti/register')

describe ('describe services/register endpoint', async () => {
  test ('check playerId dont have in Firestore', async () => { 
    const result = await isPlayer('$$')
    expect(result).toEqual(false)
    expect(libFirestore.getStoreById.mock.calls.length).toBe(1)
  })

  test ('check playerId already have in Firestore', async () => { 
    const result = await isPlayer('1')
    expect(libFirestore.getStoreById.mock.calls.length).toBe(2)
  })
  
  test ('create new user to Firestore', async () => {
    const result = await createUser(
      { 
        storeId: '1', 
        playerId: '5e094f14-fd88-493b-a2a3-ea09bb69f1b1', 
        isAllowed: true,
        dataOneSignal: getPlayer('1'),
        dataSellsuki: getStoreNoti('5e094f14-fd88-493b-a2a3-ea09bb69f1b1')
      }
    )

    expect(result).toEqual({ success: 1, message: 'Created success.'})
    expect(libOnesignal.getDevice.mock.calls.length).toBe(1)
    expect(libSellsuki.getStoreNoti.mock.calls.length).toBe(1)
    expect(webPushNotification.storeDataTransform.mock.calls.length).toBe(1)
    expect(libFirestore.createStore.mock.calls.length).toBe(1)
  })
})
