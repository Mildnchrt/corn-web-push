let constant 
if (process.env.NODE_ENV==='production') {
  constant = require('./production/constant')
} else if (process.env.NODE_ENV==='staging') {
  constant = require('./staging/constant')
} else { 
  constant = require('./constant')
}
module.exports = constant 