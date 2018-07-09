const userRef = require('../../config')

module.exports = {
  async updateData (storeId, data) {
    userRef.database
      .init()
      .doc(storeId)
      .update(data)
  }
}
