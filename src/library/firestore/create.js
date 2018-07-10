const userRef = require('../../config')

module.exports = {
  createData (storeId, data) {
    // let result = null
    // try {
    //   result = userRef.database
    //     .init()
    //     .doc(storeId)
    //     .set(data)
    //     .then( function () {
    //       return 'success'
    //     }).catch( function () {
    //       return 'unsuccess'
    //     })
    // } catch (e) {
    //   console.error(e)
    //   throw e
    // }
    // return result

    try {
      userRef.database
        .init()
        .doc(storeId)
        .set(data)
        .then(function () {
          return 'success'
        })
        .catch(function () {
          return 'unsuccess'
        })
    } catch (err) {
      console.error(err)
    }

    return {
      success: 1, 
      message: 'created success'
    }
  }
}


