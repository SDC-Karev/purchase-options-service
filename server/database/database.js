const mysql = require('mysql');
const config = require('./config.js');

const db = mysql.createPool(config);

const query = (queryString, queryArgs) => (
  new Promise((resolve, reject) => {
    db.query(queryString, queryArgs, (err, result) => {
      if (err) {
        console.log(queryString)
        console.log(err.message)
        reject(err.message);
      }
      resolve(result);
    });
  })
);

module.exports.query = query;
