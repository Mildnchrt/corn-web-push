const userRef = require('../../config')

module.exports = {
  async deleteData (storeId) {
  userRef.database
    .init()
    .doc(storeId)
    .delete()
    
  return {}
  }
}