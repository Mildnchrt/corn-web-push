const userRef = require('../../config')

module.exports = {
  getActiveUser() {
    // return new Promise((resolve, reject) => {
        return userRef.database
          .init()
          .where('isComplete', '==', false)
          .where('isAllow', '==', true)
          .get()
          // .then((snapshot) => {
          //   resolve(snapshot)
          // })
          // .catch((err) => {
          //   console.log('Error getting not done stage', err)
          //   reject(err)
          // })
    // })
  } 
}