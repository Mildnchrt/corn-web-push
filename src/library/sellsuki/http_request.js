const axios = require('axios')


module.exports = {
  fetch: async function (url) {
    return await axios.get(url)
      .catch((e) => { 
        console.log(e.stack) 
      })
  }
}
