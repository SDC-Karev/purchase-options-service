const { Client, Pool } = require('pg');

const client = new Pool({
  user: 'gamer',
  host: 'localhost',
  database: 'purchaseOptions',
  password: 'halomarine',
  port: 5433,
});

client.connect();

exports.query = (queryString, queryParams) => client.query(queryString, queryParams);

exports.postGameQueryString = `INSERT INTO games (game_id, game_name, game_price, game_banner, game_release_date, dev_name, sale_amount, platforms, tags)
                              VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8);`;

exports.gameQueryString = `SELECT
json_build_object(
    'game_id', g.game_id,
    'game_name', g.game_name,
    'game_price', g.game_price,
    'game_banner', g.game_banner,
    'game_release_date', g.game_release_date,
    'game_dev_name', g.dev_name,
    'game_sale_amount', g.sale_amount,
    'platforms', g.platforms,
    'tags', g.tags
)
FROM games g
WHERE g.game_id = $1;`;

exports.bundlesQueryString = `SELECT
json_agg(
  json_build_object(
    'bundle_id', b.bundle_id,
    'bundle_name', b.bundle_name,
    'bundle_price', b.bundle_price,
    'sale_amount', b.sale_amount,
    'platforms', b.platforms
  )
)
FROM bundles b
INNER JOIN games_bundles gb
ON gb.game_id = $1
AND gb.bundle_id = b.bundle_id;`;

exports.gamesByBundleIdQueryString = `SELECT
json_agg(
json_build_object(
  'game_id', g.game_id,
  'game_name', g.game_name,
  'game_price', g.game_price,
  'game_banner', g.game_banner,
  'game_release_date', g.game_release_date,
  'game_dev_name', g.dev_name,
  'game_sale_amount', g.sale_amount,
  'platforms', g.platforms,
  'tags', g.tags
)
)
FROM games g
INNER JOIN games_bundles gb
ON gb.bundle_id = $1
AND gb.game_id = g.game_id;`;
