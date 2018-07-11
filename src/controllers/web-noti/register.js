const { register } = require('../../services/web-noti')

module.exports = async function (request, response) {
  let updateTime = new Date()
  let hasDataFirestore = await register.checkPlayerFirestore(request.params.storeid)

  if (!hasDataFirestore) {
    let responseCreateData = await register.createNewUser(request.params.storeid, 
      request.params.playerid, 
      request.params.allow, 
      updateTime
    )
    console.log('>>>', responseCreateData)
    return response.send(responseCreateData)
  } else {
    return response.send('alreadyHaveUser')
  }
}