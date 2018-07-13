const storeRef = require('../../config')

module.exports = {
  getFilterUser (key, operation, value) {
    return storeRef.database
    .init()
    .where(key, operation, value)
    .get()
  }
}