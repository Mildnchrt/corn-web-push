const userRef = require('../../config')

module.exports = {
  getFilterUser (key, operation, value) {
    return userRef.database
    .init()
    .where(key, operation, value)
    .get()
  }
}