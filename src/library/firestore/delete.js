const storeRef = require('../../config')

module.exports = {
  deleteData (storeId) {
    storeRef.database
      .init()
      .doc(storeId)
      .delete()
      
    return {
      success: 1, 
      message: 'Deleted success.'
    }
  }
}