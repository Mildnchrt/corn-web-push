const userRef = require('./config')

module.exports = async function (storeId, data) {
  let result = null
  try {
    result = await userRef
      .init()
      .doc(storeId)
      .set(data)
      .then( function () {
        return 'success'
      }).catch( function () {
        return 'unsuccess'
      })
  } catch (e) {
    console.error(e)
  }
  
  return result
}


