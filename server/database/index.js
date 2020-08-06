var { query } = require('./database.js');
var { bundleByGameId, gameById } = require('./api.js');
var basicQueries = require('./queries');

module.exports = {
  query,
  basicQueries,
  bundleByGameId,
  gameById
}
