const userRef = require('../../config')

module.exports = async function (storeId, data) {
  userRef.database
    .init()
    .doc(storeId)
    .update(data)

  return {}
}


