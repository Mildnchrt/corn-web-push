const { register } = require('../../services/web-noti')

module.exports = async function (request, response) {
  //let updateTime = new Date()
  let params = request.params
  let hasDataFirestore = register.isPlayer(params.storeid)
  if (!hasDataFirestore) {
    let storeData  = register.getStoreNoti(params.storeid)
    let playerData = register.getPlayer(params.playerid)
    let res = register.createUser({ 
      storeId: params.storeid, 
      playerId: params.playerid, 
      isAllowed: params.allow,
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