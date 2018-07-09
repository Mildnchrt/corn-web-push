const userRef = require('../../config')

module.exports = {
  async createData (storeId, data) {
    let result = null
    try {
      result = await userRef.database
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
      throw e
    }
    
    return result
  }
}


