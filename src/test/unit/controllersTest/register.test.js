const { createUserToFirestore } = require('../../../controllers/web-noti')
const { register } = require('../../../services/web-noti/')
register.checkPlayerFirestore = jest.fn().mockReturnValueOnce(true).mockReturnValue(false)
register.createNewUser = jest.fn().mockReturnValue('success')
let req = {
 params: {
  storeid: '1',
  playerid: '5e094f14-fd88-493b-a2a3-ea09bb69f1b1',
  allow: 'true'
 }
}

let res = {
 send: function (text) { return text }
}

describe('register endpoint', async () => {

 it('test alreadyHave in Firestore', async () => { 
  const result = await createUserToFirestore(req, res)
  expect(register.createNewUser.mock.calls.length).toBe(0)
  expect(register.checkPlayerFirestore.mock.calls.length).toBe(1)
  expect(result).toBe('alreadyHave')  
  })

 it('test createNewUse to firestore', async () => {
  const result = await createUserToFirestore(req, res)
  expect(register.checkPlayerFirestore.mock.calls.length).toBe(2)
  expect(register.createNewUser.mock.calls.length).toBe(1)
  expect(result).toBe('success')  
 })

})
