const cronController = require('./cronWebPush')
const uiController = require('./ui')
// const getPlayerIdFireStore = require('./getPlayer')
const createUserToFirestore = require('./register')

module.exports = {
  cronController,
  uiController,
  // getPlayerIdFireStore,
  createUserToFirestore
}
