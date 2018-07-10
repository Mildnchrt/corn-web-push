const userRef = require('../../config')

module.exports = {
  getUserByStoreId (storeId) {
    return userRef.database
      .init()
      .doc(storeId)
      .get()

    // return new Promise((resolve, reject) => {
    //   userRef.database
    //     .init()
    //     .doc(storeId)
    //     .get()
    //       .then(doc => {
    //         if (!doc.exists) {
    //           console.log('No such document!')
    //           resolve(false)
    //         } else {
    //           console.log('Document data:', doc.data())
    //           resolve(doc.data())
    //         }
    //       })
    //       .catch(error => {
    //         console.log('Error getting document', error)
    //         reject(error)
    //       })
    // })
  }
}
