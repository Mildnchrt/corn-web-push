const userRef = require('../../config')

module.exports = {
  getUserByStoreId (storeId) {
    console.log('comeinnn')
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
