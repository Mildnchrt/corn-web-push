let mysql = require('mysql')

class DbConnector {
  constructor (host, userName, password, database) {
    this.connection = mysql.createConnection({
      host: host,
      user: userName,
      password: password,
      database: database
    })
  }
  getConnector () {
    return this.connection
  }
  async dbConnect () {
    this.connection.connect(function (err) {
      if (err) {
        console.error('error connecting: ' + err.stack)
        return
      }
     
      console.log('connected as id ' + this.connection)
    })
  }
  async dbDisConnect () {
    this.connection.end()
  }
  async getSchema (tableName) {
    return new Promise ((resolve, reject)=>{
      this.connection.query(`DESCRIBE ${tableName}`, function (error, results, fields) {
        if (error) reject(error)
        resolve(results)
      })
    })
  } 
  async getTableName () {
    return new Promise ((resolve, reject)=>{
      this.connection.query('SHOW TABLES', function (error, results, fields) {
        if (error) reject(error)
        resolve(results)
        
      })
    })
  } 
}

module.exports = DbConnector 
