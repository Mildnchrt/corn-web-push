const userRef = require('../../config')

module.exports = async function () {
  return new Promise((resolve, reject) => {
    resolve(
      userRef.database.init().where('isComplete', '==', false).where('isAllow', '==', true).get()
        .then((snapshot) => {
          return snapshot
        })
        .catch((err) => {
          console.log('Error getting not done stage', err)
        })
    )
  })
}