const userRef = require('../../config')

module.exports = {
  updateData (storeId, data) {
    userRef.database
      .init()
      .doc(storeId)
      .update(data)

    return {
      success: 1, 
      message: 'updated success'
    }
  }
}
