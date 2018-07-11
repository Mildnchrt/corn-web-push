const { registerController } = require('../../../controllers/web-noti')
const { register } = require('../../../services/web-noti/')

register.isPlayer = jest.fn().mockReturnValueOnce(true).mockReturnValue(false)
register.createUser = jest.fn().mockReturnValue('success')

let request = {
 params: {
  storeid: '1',
  playerid: '5e094f14-fd88-493b-a2a3-ea09bb69f1b1',
  allow: 'true'
 }
}

let response = {
 send: function (text) { return text }
}

describe('describe controller/register endpoint', async () => {

  it ('already have user in Firestore', async () => { 
    const result = await registerController(request, response)

    expect(register.createUser.mock.calls.length).toBe(0)
    expect(register.isPlayer.mock.calls.length).toBe(1)
    expect(result).toBe({ success: 0, message: "Store data is duplicated." })  
  })

  it ('create new user to Firestore', async () => {
    const result = await registerController(request, response)

    expect(register.isPlayer.mock.calls.length).toBe(2)
    expect(register.createUser.mock.calls.length).toBe(1)
    expect(result).toBe('success')  
  })
})
