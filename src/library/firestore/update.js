const userRef = require('./config')

module.exports = {
  updateData: async function (storeId, data) {
    userRef
      .init()
      .doc(storeId)
      .update(data)
  }
}


