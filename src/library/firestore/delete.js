const userRef = require('../../config')

module.exports = {
  deleteData (storeId) {
    userRef.database
      .init()
      .doc(storeId)
      .delete()
      
    return {
      success: 1, 
      message: 'deleted success'
    }
  }
}