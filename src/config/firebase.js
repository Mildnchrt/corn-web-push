const firebase = require('firebase')
const constant = require('./constant')

firebase.initializeApp({
  apiKey: constant.FIRESTORE.API_KEY,
  authDomain: constant.FIRESTORE.AUTH_DOMIN,
  databaseURL: constant.FIRESTORE.DATABASE_URL,
  projectId: constant.FIRESTORE.PROJECT_ID,
  storageBucket: constant.FIRESTORE.STORAGE_BUCKET,
  messagingSenderId: constant.FIRESTORE.MESSAGING_SENDER_ID
})

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore()
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

class config {
  init () {
    return db.collection('store')
  }
}

module.exports = new config()