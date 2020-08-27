const {
  getGameById,
  updateGame,
  postGame,
  deleteGame,
  getTagsByGameId,
  getBundleByGameID,
  getGamesFromBundleID,
  getPlatformsByGameId,
  postBundle,
  updateBundle,
  deleteBundle,
  createGamesBundlesRow,
  getBundle
} = require('./queries.js');

const gameById = async (id) => {
  const [gameData] = await getGameById(id);
  gameData.tags = await getTagsByGameId(id);
  gameData.platforms = await getPlatformsByGameId(id);
  return gameData;
};

const postNewGame = async (data) => {
  const params = [
    data.game_name,
    data.game_price,
    data.game_banner,
    data.game_release_date,
    data.dev_id,
    data.sale_id,
    // can add bundles, tags and platforms as well
  ];
  return postGame(params);
};

const updateGameByData = async (data) => {
  const params = [
    data.game_name,
    data.game_price,
    data.game_banner,
    data.game_release_date,
    data.dev_id,
    data.sale_id,
    data.game_id
  ];

  return updateGame(params);

};

const deleteGameById = async (id) => {
  return deleteGame(id);
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

const postBundleByGameId = async (data) => {
  const params = [
    data.bundle_name,
    data.bundle_price,
    data.sale_id
  ];
  // console.log(params);
  // const [bundleResults] = await postBundle(params).catch((e) => console.log(e));
  // console.log('bundleresults from api.js', bundleResults);
  // return bundleResults;
  return postBundle(params)
    .then((results) => {
      const newParams = [data.gameId, results.insertId.toString()];
      console.log(newParams);
      return createGamesBundlesRow(newParams);
    })
    .catch((error) => {
      return error;
    })
};

const postNewBundle = async (data) => {
  const params = [
    data.bundle_name,
    data.bundle_price,
    data.sale_id
  ];

  return postBundle(params)
}

const updateBundleByBundleId = async (data) => {
  const params = [
    data.bundle_name,
    data.bundle_price,
    data.sale_id,
    data.bundle_id
  ];

  return updateBundle(params);
};

const deleteBundleByBundleId = async (data) => {
  return deleteBundle(data)
}

const getBundleByBundleId = async (data) => {
  return getBundle(data)
}


module.exports = {
  bundleByGameId,
  gameById,
  postNewGame,
  updateGameByData,
  deleteGameById,
  postBundleByGameId,
  postNewBundle,
  updateBundleByBundleId,
  deleteBundleByBundleId,
  getBundleByBundleId
};
