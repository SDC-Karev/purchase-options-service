var { query } = require('./database.js');
var { bundleByGameIdAPI, gameByIdAPI } = require('./api.js');

module.exports = {
  query,
  bundleByGameIdAPI,
  gameByIdAPI
}
