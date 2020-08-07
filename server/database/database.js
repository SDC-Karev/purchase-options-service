<<<<<<< Updated upstream
var mysql = require('mysql');

var db = mysql.createPool({
  'connectionLimit': 10,
  'user': 'node',
  'password': 'pw',
  'database': 'steam',
  'host': 'localhost'
});

var query = (query, queryArgs) => {
  return new Promise((resolve, reject) => {
    db.query(query, queryArgs, (err, result) => {
=======
const mysql = require('mysql');

const db = mysql.createPool({
  connectionLimit: 10,
  user: 'node',
  password: 'pw',
  database: 'steam',
  host: 'localhost',
});

const query = (queryString, queryArgs) => (
  new Promise((resolve, reject) => {
    db.query(queryString, queryArgs, (err, result) => {
>>>>>>> Stashed changes
      if (err) {
        reject(err.message);
      }
      resolve(result);
<<<<<<< Updated upstream
    })
  })
}

module.exports.query = query;
=======
    });
  })
);

module.exports.query = query;
>>>>>>> Stashed changes
