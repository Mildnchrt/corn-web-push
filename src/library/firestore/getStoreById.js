const storeRef = require('../../config')

module.exports = {
  getStoreById (storeId) {
    return storeRef.database
      .init()
      .doc(storeId)
      .get()

  }
}
