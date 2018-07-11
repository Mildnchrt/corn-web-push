const { checkPlayerFirestore, createNewUser } = require('../../../services/web-noti/register') // function will test
const libFirestore = require('../../../library/firestore')
const libOnesignal = require('../../../library/onesignal')
const libSellsuki = require('../../../library/sellsuki')
const webPushNotification  = require('../../../services/web-noti/webPushNotification')

//mock return value function
libFirestore.getUserByStoreId.getUserByStoreId = jest.fn().mockReturnValueOnce(false).mockResolvedValue({ doc: { data: {} } })
libFirestore.createData.createData = jest.fn().mockReturnValue('success')
libOnesignal.getDevice = jest.fn().mockReturnValue({ response: { data: {} } })
libSellsuki.getUser = jest.fn().mockReturnValue({ data: { results: {} } })
webPushNotification.changeDataFormat = jest.fn().mockReturnValue({})

describe ('describe services/register endpoint', async () => {
  it ('check playerId dont have in Firestore', async () => { 
    const result = await checkPlayerFirestore('1')

    expect(result).toBe(false)
    expect(libFirestore.getUserByStoreId.mock.calls.length).toBe(1)
  })

  it ('check playerId already have in Firestore', async () => { 
    const result = await checkPlayerFirestore('1')

    expect(result).toBe(true)
    expect(libFirestore.getUserByStoreId.mock.calls.length).toBe(2)
  })
  
  it ('create new user to Firestore', async () => {
    let updateTime = new Date()
    const result = await createNewUser('1', '5e094f14-fd88-493b-a2a3-ea09bb69f1b1', true, updateTime)

    expect(result).toBe('success')
    expect(libOnesignal.getDevice.mock.calls.length).toBe(1)
    expect(libSellsuki.getUser.mock.calls.length).toBe(1)
    expect(webPushNotification.changeDataFormat.mock.calls.length).toBe(1)
    expect(libFirestore.createData.mock.calls.length).toBe(1)
  })
})
