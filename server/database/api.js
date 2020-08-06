var { _getGameById, _getTagsByGameId, _getBundleByGameID, _getGamesFromBundleID } = require('./queries.js')

var gameById = (id) => {
  var gameData;
  return _getGameById(id)
    .then((game) => {
      gameData = game;
      return _getTagsByGameId(id);
    })
    .then((tags) => {
      gameData.tags = tags;
      return Promise.resolve(gameData);
    });
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


