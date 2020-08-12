const { query } = require('./database.js');
const { bundleByGameId, gameById } = require('./api.js');
const { add, remove } = require('./seed/seed.js');
const basicQueries = require('./queries');

module.exports = {
  query,
  basicQueries,
  bundleByGameId,
  gameById,
  add,
  remove,
};
