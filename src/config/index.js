let constant 
let database 
if (process.env.NODE_ENV==='production') {
  constant = require('./production/constant')
  database = require('./production/firebase')
} else if (process.env.NODE_ENV==='staging') {
  constant = require('./staging/constant')
  database = require('./staging/firebase')
} else { 
  constant = require('./constant')
  database = require('./firebase')
}
module.exports = { 
  constant, 
  database
} 