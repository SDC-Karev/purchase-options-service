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
    })
    .then((tags) => {
      gameData.tags = tags;
      return Promise.resolve(gameData);
    });
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
