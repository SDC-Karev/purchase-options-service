const mysql = require('mysql');
const config = require('./config.js');

const db = mysql.createPool(config);

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
