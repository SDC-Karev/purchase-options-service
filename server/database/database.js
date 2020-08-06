var mysql = require('mysql');

var db = mysql.createPool({
  'connectionLimit': 10,
  'user': 'node',
  'password': 'pw',
  'database': 'steam'
});

var query = (query, queryArgs) => {
  return new Promise((resolve, reject) => {
    db.query(query, queryArgs, (err, result) => {
      if (err) {
        reject(err.message);
      }
      resolve(result);
    })
  })
}

module.exports.query = query;