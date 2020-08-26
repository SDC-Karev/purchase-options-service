const {
  getGameById,
  getTagsByGameId,
  getBundleByGameID,
  getGamesFromBundleID,
  getPlatformsByGameId,
} = require('./queries.js');

const gameById = async (id) => {
  const [gameData] = await getGameById(id);
  gameData.tags = await getTagsByGameId(id);
  gameData.platforms = await getPlatformsByGameId(id);
  return gameData;
};

const bundleByGameId = async (id) => {
  let bundles = await getBundleByGameID(id);
  let games;
  bundles = bundles.map(async (bundle) => {
    games = await getGamesFromBundleID(bundle.bundle_id);
    games = games.map(async (game) => {
      game.tags = await getTagsByGameId(game.game_id);
      game.platforms = await getTagsByGameId(game.game_id);
      return game;
    });
    bundle.games = await Promise.all(games);
    bundle.platforms = await getPlatformsByGameId(bundle.bundle_id);
    return bundle;
  });

  return Promise.all(bundles);
};

module.exports = {
  bundleByGameId,
  gameById,
};
