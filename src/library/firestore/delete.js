const userRef = require('../../config')

module.exports = async function (storeId) {
  userRef.database
    .init()
    .doc(storeId)
    .delete()

  return {}
}


