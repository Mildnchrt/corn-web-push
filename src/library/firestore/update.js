const userRef = require('../../config')

module.exports = {
  updateData: async function (storeId, data) {
    userRef.database
      .init()
      .doc(storeId)
      .update(data)
  }
}
