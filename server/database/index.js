const { query } = require('./database.js');
const {
  bundleByGameId,
  gameById,
  postNewGame,
  updateGameByData,
  deleteGameById,
  postBundleByGameId,
  updateBundleByBundleId,
  deleteBundleByBundleId,
  postNewBundle,
  getBundleByBundleId } = require('./api.js');
const { add, remove } = require('./seed/seed.js');
const basicQueries = require('./queries');

module.exports = {
  query,
  basicQueries,
  bundleByGameId,
  gameById,
  add,
  remove,
  postNewGame,
  updateGameByData,
  deleteGameById,
  postBundleByGameId,
  updateBundleByBundleId,
  deleteBundleByBundleId,
  postNewBundle,
  getBundleByBundleId
};
