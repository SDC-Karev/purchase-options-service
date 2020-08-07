<<<<<<< Updated upstream
var { _getGameById, _getTagsByGameId, _getBundleByGameID, _getGamesFromBundleID } = require('./queries.js')

var gameById = (id) => {
  var gameData;
  return _getGameById(id)
    .then((game) => {
      gameData = game;
      return _getTagsByGameId(id);
=======
const {
  getGameById,
  getTagsByGameId,
  getBundleByGameID,
  getGamesFromBundleID,
} = require('./queries.js');

const gameById = (id) => {
  let gameData;
  return getGameById(id)
    .then((game) => {
      gameData = game;
      return getTagsByGameId(id);
>>>>>>> Stashed changes
    })
    .then((tags) => {
      gameData.tags = tags;
      return Promise.resolve(gameData);
    });
<<<<<<< Updated upstream
}

var bundleByGameId = (id) => {
  return _getBundleByGameID(id) // get bundle data
    .then((res) => {
      var data = res.map((bundle) => {
        return _getGamesFromBundleID(bundle.bundle_id)
          .then((res) => {
            bundle.games = res;
            return Promise.resolve(bundle);
          })
      });
      return Promise.all(data);
    })
    .then((bundles) => {
      bundles = bundles.map((bundle, index) => {
        var games = bundle.games.map((game) => {
          return _getTagsByGameId(game.game_id)
            .then((tags) => {
              game.tags = tags;
              return Promise.resolve(game);
            })
        });
        return Promise.all(games)
          .then((games) => {
            bundle.games = games;
            return Promise.resolve(bundle);
          })
      });
      return Promise.all(bundles);
    })
}

module.exports = {
  bundleByGameId,
  gameById
};


=======
};

const bundleByGameId = (id) => (
  getBundleByGameID(id) // get bundle data
    .then((bundlesResp) => {
      const data = bundlesResp.map((bundle) => (
        getGamesFromBundleID(bundle.bundle_id)
          .then((gamesBundleResp) => {
            const b = bundle;
            b.games = gamesBundleResp;
            return Promise.resolve(b);
          })
      ));
      return Promise.all(data);
    })
    .then((bundles) => {
      const bs = bundles.map((bundle) => {
        const games = bundle.games.map((game) => (
          getTagsByGameId(game.game_id)
            .then((tags) => {
              const g = game;
              g.tags = tags;
              return Promise.resolve(g);
            })
        ));
        return Promise.all(games)
          .then((gamesResult) => {
            bs.games = gamesResult;
            return Promise.resolve(bs);
          });
      });
      return Promise.all(bs);
    })
);

module.exports = {
  bundleByGameId,
  gameById,
};
>>>>>>> Stashed changes
