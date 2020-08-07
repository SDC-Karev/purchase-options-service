const { query } = require('./database.js');
const { bundleByGameId, gameById } = require('./api.js');
const basicQueries = require('./queries');

module.exports = {
  query,
  basicQueries,
  bundleByGameId,
  gameById,
};
