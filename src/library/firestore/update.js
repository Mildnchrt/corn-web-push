const storeRef = require('../../config')

module.exports = {
  updateData (storeId, data) {
    storeRef.database
      .init()
      .doc(storeId)
      .update(data)

    return {
      success: 1, 
      message: 'Updated success.'
    }
  }
}
