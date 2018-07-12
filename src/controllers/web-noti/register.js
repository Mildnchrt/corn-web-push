const { register } = require('../../services/web-noti')

module.exports = async function (request, response) {
  let params = request.params
  let hasDataFirestore = await register.isPlayer(params.storeid)

  if (!hasDataFirestore) {
    let storeData  =  await register.getStoreNoti(params.storeid)
    let playerData =  await register.getPlayer(params.playerid)
    let res = await register.createUser({ 
      storeId: params.storeid, 
      playerId: params.playerid, 
      isAllowed: Boolean(params.allow),
      dataOneSignal: playerData,
      dataSellsuki: storeData
    })
    return response.send(res)
  } else {
    return response.send({
      success: 0,
      message: 'Store data is duplicated.'
    })
  }
}