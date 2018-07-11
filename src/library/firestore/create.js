const userRef = require('../../config')

module.exports = {
  createStore (storeId, data) {
    return userRef.database
      .init()
      .doc(storeId)
      .set(data)
      .then(function () {
        return {
          success: 1,
          message: 'success'
        }
      })
      .catch(function () {
        return {
          success: 0,
          message: 'fail'
        }
      })
  }
}
