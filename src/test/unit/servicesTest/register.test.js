const { checkPlayerFirestore, createNewUser } = require('../../../services/web-noti/register') // function will test
const libFirestore = require('../../../library/firestore')
const libOnesignal = require('../../../library/onesignal')
const libSellsuki = require('../../../library/sellsuki')
const webPushNotification  = require('../../../services/web-noti/webPushNotification')
//mock return value function
libFirestore.getUserByStoreId.getUserByStoreId = jest.fn().mockReturnValueOnce(false).mockResolvedValue({doc: {data: {}}})
libFirestore.createData.createData = jest.fn().mockReturnValue('success')
libOnesignal.getDevice.getDevice = jest.fn().mockReturnValue({response: {data: {}}})
libSellsuki.getUser.getUser = jest.fn().mockReturnValue({data: {results: {}}})
webPushNotification.transferData = jest.fn().mockReturnValue({})


describe('test register services Have', async () => {

  it('test checkPlayerFirestore function (not have)', async () => { 
    const result = await checkPlayerFirestore('1')
    expect(result).toBe(false)
    expect(libFirestore.getUserByStoreId.getUserByStoreId.mock.calls.length).toBe(1)
  })

  it('test checkPlayerFirestore function (have already)', async () => { 
    const result = await checkPlayerFirestore('1')
    expect(result).toBe(true)
    expect(libFirestore.getUserByStoreId.getUserByStoreId.mock.calls.length).toBe(2)
  })
  
  it('test createNewUser function', async () => {
    let updateTime = new Date()
    const result = await createNewUser('1', '5e094f14-fd88-493b-a2a3-ea09bb69f1b1', true, updateTime)
    expect(result).toBe('success')
    expect(libOnesignal.getDevice.getDevice.mock.calls.length).toBe(1)
    expect(libSellsuki.getUser.getUser.mock.calls.length).toBe(1)
    expect(webPushNotification.transferData.mock.calls.length).toBe(1)
    expect(libFirestore.createData.createData.mock.calls.length).toBe(1)
  })


})


