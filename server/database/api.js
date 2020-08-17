const {
  getGameById,
  getTagsByGameId,
  getBundleByGameID,
  getGamesFromBundleID,
  getPlatformsByGameId,
  getPlatformsByBundleId,
} = require('./queries.js');

const gameById = (id) => {
  let gameData;
  return getGameById(id)
    .then((game) => {
      [gameData] = game;
      return getTagsByGameId(id);
    })
    .then((tags) => {
      if (gameData) {
        gameData.tags = tags;
      }
      return getPlatformsByGameId(id);
    })
    .then((platforms) => {
      if (gameData) {
        gameData.platforms = platforms;
      }
      return Promise.resolve(gameData);
    });
};

const bundleByGameId = (id) => (
  getBundleByGameID(id) // get bundle data
    .then((bundlesResp) => {
      const data = bundlesResp.map((bundle) => {
        const b = bundle;
        return getGamesFromBundleID(bundle.bundle_id)
          .then((gamesBundleResp) => {
            b.games = gamesBundleResp;
            return getPlatformsByGameId(bundle.bundle_id);
          })
          .then((platforms) => {
            b.platforms = platforms;
            return Promise.resolve(b);
          });
      });
      return Promise.all(data);
    })
    .then((bundles) => {
      const bs = bundles.map((bundle) => {
        const games = bundle.games.map((game) => {
          const g = game;
          return getTagsByGameId(g.game_id)
            .then((tags) => {
              g.tags = tags;
              return getPlatformsByGameId(g.game_id);
            })
            .then((platforms) => {
              g.platforms = platforms;
              return Promise.resolve(g);
            });
          });
        const b = bundle;
        return Promise.all(games)
          .then((gamesResult) => {
            b.games = gamesResult;
            return Promise.resolve(b);
          });
      });
      return Promise.all(bs);
    })
    .then((finalData) => Promise.resolve(JSON.parse(JSON.stringify(finalData))))
);

module.exports = {
  bundleByGameId,
  gameById,
};
