const storeRef = require('../../config')

module.exports = {
  createStore (storeId, data) {
    return storeRef.database
      .init()
      .doc(storeId)
      .set(data)
      .then(function () {
        return {
          success: 1,
          message: 'Created success.'
        }
      })
      .catch(function () {
        return {
          success: 0,
          message: 'Fail to create.'
        }
      })
  }
}
