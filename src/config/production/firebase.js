const firebase = require('firebase')

firebase.initializeApp({
  apiKey: 'AIzaSyCWJOdnyasNUL7xAWi83WDHihsKj92N7R8',
  authDomain: 'notification-7e499.firebaseapp.com',
  databaseURL: 'https://notification-7e499.firebaseio.com',
  projectId: 'notification-7e499',
  storageBucket: 'notification-7e499.appspot.com',
  messagingSenderId: '400202276323'
})

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore()
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

class config {
  init () {
    return db.collection('users')
  }
}

module.exports = new config()