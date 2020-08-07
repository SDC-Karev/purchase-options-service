<<<<<<< Updated upstream
var { query } = require('./database.js');
var { bundleByGameId, gameById } = require('./api.js');
var basicQueries = require('./queries');
=======
const { query } = require('./database.js');
const { bundleByGameId, gameById } = require('./api.js');
const basicQueries = require('./queries');
>>>>>>> Stashed changes

module.exports = {
  query,
  basicQueries,
  bundleByGameId,
<<<<<<< Updated upstream
  gameById
}
=======
  gameById,
};
>>>>>>> Stashed changes
