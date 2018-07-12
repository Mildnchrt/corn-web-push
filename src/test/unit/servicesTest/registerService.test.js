const libFirestore = require('../../../library/firestore')
const libOnesignal = require('../../../library/onesignal')
const libSellsuki = require('../../../library/sellsuki')
const webPushNotification  = require('../../../services/web-noti/webPushNotification')

libFirestore.getStoreById = jest.fn().mockReturnValueOnce(false).mockReturnValue({ doc: { data: {} } })
libFirestore.createStore = jest.fn().mockReturnValue('success')
libOnesignal.getDevice = jest.fn().mockReturnValue({ response: { data: {} } })
libSellsuki.getStoreNoti= jest.fn().mockReturnValue({ data: { results: {} } })
webPushNotification.userDataTransform = jest.fn().mockReturnValue({})

const { isPlayer, createUser, getPlayer, getStoreNoti } = require('../../../services/web-noti/register')

describe ('describe services/register endpoint', async () => {
  test ('check playerId dont have in Firestore', async () => { 
    const result = await isPlayer('$$')

    expect(result).toBe(false)
    expect(libFirestore.getStoreById.mock.calls.length).toBe(1)
  })

  test ('check playerId already have in Firestore', async () => { 
    const result = await isPlayer('1')
    expect(result).toEqual({ doc: { data: {} } })
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

    expect(result).toBe('success')
    expect(libOnesignal.getDevice.mock.calls.length).toBe(1)
    expect(libSellsuki.getStoreNoti.mock.calls.length).toBe(1)
    expect(webPushNotification.userDataTransform.mock.calls.length).toBe(1)
    expect(libFirestore.createStore.mock.calls.length).toBe(1)
  })
})
