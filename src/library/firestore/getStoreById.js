const userRef = require('../../config')

module.exports = {
  getStoreById (storeId) {
    return userRef.database
      .init()
      .doc(storeId)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!')
          return false
        } else {
          console.log('Document data:', doc.data())
          return doc.data()
        }
      })
  }
}