const storeRef = require('../../config')

module.exports = {
  getActiveUser() {
    return storeRef.database
      .init()
      .where('isCompleted', '==', false)
      .where('isAllowed', '==', true)
      .get()
  } 
}