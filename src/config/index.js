let constant 
if (process.env.NODE_ENV==='production') {
  constant = require('./production/constant')
} else if (process.env.NODE_ENV==='staging') {
  console.log('staging export')
  constant = require('./staging/constant')
} else { 
  console.log('local export')
  constant = require('./constant')
}
module.exports = constant 