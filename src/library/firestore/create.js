const storeRef = require('../../config')

module.exports = {
  createStore (storeId, data) {
    return storeRef.database
      .init()
      .doc(storeId)
      .set(data)
  }
}
