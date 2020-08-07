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
      if (err) {
        reject(err.message);
      }
      resolve(result);
    });
  })
);

module.exports.query = query;
