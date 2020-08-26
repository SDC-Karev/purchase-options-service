const mysql = require('mysql');

require('dotenv').config();

const db = mysql.createPool({
  connectionLimit: 10,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'purchaseOptions',
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
