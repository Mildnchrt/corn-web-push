const userRef = require('./config')
module.exports = {
  getUserByStoreId (storeId) {
    return new Promise((resolve, reject) => {
      userRef.init().doc(storeId).get()
        .then(doc => {
          console.log('comein')
          if (!doc.exists) {
            console.log('No such document!')
            resolve(false)
          } else {
            console.log('Document data:', doc.data())
            resolve(doc.data())
          }
        })
        .catch(error => {
          console.log('Error getting document', error)
          reject(error)
        })
    })
  }
}

// new Promise((resolve, reject) => {
//   userRef.get().then(doc => {
//     resolve(result)
//   }).catch(err => {
//     reject(new Error(err))
//   })
// })
