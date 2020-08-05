var { query } = require('./database.js');
var {   getGameById, getBundleByGameID } = require('./database.js');

module.exports = {
  query,
  getGameById,
  getBundleByGameID
}
