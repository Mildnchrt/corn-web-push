const userRef = require('../../config')

module.exports = {
  getFilterUser (key, operation, value) {
    return userRef.database
    .init()
    .where(key, operation, value)
    .get()
    
    // return new Promise((resolve, reject) => {
    //   resolve(
    //     userRef.database
    //       .init()
    //       .where(key, operation, value)
    //       .get()
    //         .then((snapshot) => {
    //           return snapshot
    //         })
    //         .catch((err) => {
    //           console.log('Error getting not done stage', err)
    //         })
    //   )
    // })
  }
}