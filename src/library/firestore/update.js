const userRef = require('../../config')

module.exports = {
  updateData (storeId, data) {
    userRef.database
      .init()
      .doc(storeId)
      .update(data)
  }
}
