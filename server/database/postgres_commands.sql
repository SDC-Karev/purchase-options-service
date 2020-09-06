SELECT
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
WHERE g.game_id = 8989900;




SELECT
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
ON gb.game_id = 8898991
AND gb.bundle_id = b.bundle_id;



SELECT
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
ON gb.bundle_id = 200003
AND gb.game_id = g.game_id;
