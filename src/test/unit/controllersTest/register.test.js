const { registerController } = require('../../../controllers/web-noti')
const { register } = require('../../../services/web-noti/')

register.checkPlayerFirestore = jest.fn().mockReturnValueOnce(true).mockReturnValue(false)
register.createNewUser = jest.fn().mockReturnValue('success')

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

    expect(register.createNewUser.mock.calls.length).toBe(0)
    expect(register.checkPlayerFirestore.mock.calls.length).toBe(1)
    expect(result).toBe('alreadyHaveUser')  
  })

  it ('create new user to Firestore', async () => {
    const result = await registerController(request, response)

    expect(register.checkPlayerFirestore.mock.calls.length).toBe(2)
    expect(register.createNewUser.mock.calls.length).toBe(1)
    expect(result).toBe('success')  
  })
})
