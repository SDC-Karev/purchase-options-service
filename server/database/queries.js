const db = require('./database.js');

const getGameById = (id) => {
  const q = `SELECT g.game_id, g.game_name, g.game_price, s.sale_amount, g.game_banner, d.dev_name
            FROM games g
            INNER JOIN sales s
              ON g.sale_id = s.sale_id
            INNER JOIN developers d
              ON g.dev_id = d.dev_id
            WHERE g.game_id = ?;`;

  return db.query(q, [id]);
};

const updateGame = (queryParams) => {
  const q = `UPDATE games g
            SET g.game_name = ?,
              g.game_price = ?,
              g.game_banner = ?,
              g.game_release_date = ?,
              g.dev_id = ?,
              g.sale_id = ?
            WHERE g.game_id = ?;`;

  return db.query(q, queryParams);
};

const postGame = (queryParams) => {
  console.log(queryParams);
  const q = `INSERT INTO games (
            game_name,
            game_price,
            game_banner,
            game_release_date,
            dev_id,
            sale_id
            )
            VALUES (?, ?, ?, ?, ?, ?);`;

  return db.query(q, queryParams);
};

const deleteGame = (id) => {
  const q = `DELETE FROM games
            WHERE game_id = ?;`;

  return db.query(q, [id]);
}


const getBundleByGameID = (id) => {
  const q = `SELECT b.bundle_id, b.bundle_name, b.bundle_price, s.sale_amount
            FROM bundles b
            INNER JOIN sales s
              ON b.sale_id = s.sale_id
            INNER JOIN games_bundles gb
              ON gb.bundle_id = b.bundle_id
            WHERE gb.game_id = ?;`;

  return db.query(q, [id]);
};

const postBundle = (queryParams) => {
  console.log('db query params: ', queryParams);
  const q = `INSERT INTO bundles (bundle_name, bundle_price, sale_id) VALUES (?, ?, ?);`;

  return db.query(q, queryParams);
};

const getGamesFromBundleID = (id) => {
  const q = `SELECT g.game_id, g.game_name, g.game_banner, g.game_release_date, d.dev_name
            FROM games g
            INNER JOIN developers d
              ON g.dev_id = d.dev_id
            INNER JOIN games_bundles gb
              ON gb.game_id = g.game_id
            WHERE gb.bundle_id = ?`;

  return db.query(q, [id]);
};

const getTagsByGameId = (id) => {
  const q = `SELECT t.tag_name, t.tag_icon
            FROM tags t
            INNER JOIN tags_games tg
              ON tg.tag_id = t.tag_id
            WHERE tg.game_id = ?;`;

  return db.query(q, [id]);
};


const getPlatformsByGameId = (id) => {
  const q = `SELECT p.platform_name, p.platform_icon
            FROM platforms p
            INNER JOIN games_platforms gp
              ON gp.platform_id = p.platform_id
            WHERE gp.game_id = ?;`;

  return db.query(q, [id]);
};

const getPlatformsByBundleId = (id) => {
  const q = `SELECT p.platform_name, p.platform_icon
            FROM platforms p
            INNER JOIN bundles_platforms bp
              ON bp.platform_id = p.platform_id
            WHERE bp.bundle_id = ?;`;

  return db.query(q, [id]);
};

const createGamesBundlesRow = (queryParams) => {
  const q = `INSERT INTO games_bundles (
              game_id,
              bundle_id
            )
            VALUES (?, ?);`;
  return db.query(q, queryParams);
};

const updateBundle = (queryParams) => {
  const q = `UPDATE bundles SET
            bundle_name = ?,
            bundle_price = ?,
            sale_id = ?
            WHERE bundle_id = ?;
  `;

  return db.query(q, queryParams);
};

const deleteBundle = (queryParams) => {
  const q = `DELETE FROM bundles WHERE bundle_id = ?;`;
  return db.query(q, queryParams);
}

const getBundle = (queryParams) => {
  const q = `SELECT * FROM bundles WHERE bundle_id = ?`;
  return db.query(q, queryParams);
}

module.exports = {
  getTagsByGameId,
  getGamesFromBundleID,
  getBundleByGameID,
  getGameById,
  getPlatformsByGameId,
  getPlatformsByBundleId,
  updateGame,
  postGame,
  deleteGame,
  postBundle,
  createGamesBundlesRow,
  updateBundle,
  deleteBundle,
  getBundle
};
