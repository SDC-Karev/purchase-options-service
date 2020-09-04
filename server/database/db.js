const { Client } = require('pg');

const client = new Client({
  user: 'gamer',
  host: 'localhost',
  database: 'purchaseOptions',
  password: 'halomarine',
  port: 5433,
});
client.connect();

exports.query = (queryString, queryParams) => client.query(queryString, queryParams);



exports.gameQueryString = `SELECT
json_build_object(
    'game_id', g.game_id,
    'game_name', g.game_name,
    'game_price', g.game_price,
    'game_banner', g.game_banner,
    'game_release_date', g.game_release_date,
    'game_dev_name', d.dev_name,
    'game_sale_amount', s.sale_amount,
    'platforms', (
                    SELECT
                    COALESCE(json_agg(
                              json_build_object(
                                  'platform_id', p.platform_id,
                                  'platform_name', p.platform_name,
                                  'platform_icon', p.platform_icon
                              )
                            )
                    FILTER (WHERE p.platform_id IS NOT NULL), '[]')
                    FROM platforms p
                    INNER JOIN games_platforms gp
                    ON gp.game_id = g.game_id
                    AND gp.platform_id = p.platform_id
                  ),
    'tags', (
              SELECT
              COALESCE(json_agg(
                      json_build_object(
                          'tag_id', t.tag_id,
                          'tag_name', t.tag_name,
                          'tag_icon', t.tag_icon
                      )
                    )
              FILTER (WHERE t.tag_id IS NOT NULL), '[]')
              FROM tags t
              INNER JOIN tags_games tg
              ON tg.tag_id = t.tag_id
              AND tg.game_id = g.game_id
            )
)
FROM games g, developers d, sales s
WHERE g.game_id = $1 and g.dev_id = d.dev_id and g.sale_id = s.sale_id;`;

exports.bundlesQueryString = `
                              SELECT
                                  json_agg(
                                    json_build_object(
                                      'bundle_id', b.bundle_id,
                                      'bundle_name', b.bundle_name,
                                      'bundle_price', b.bundle_price,
                                      'sale_amount', s.sale_amount,
                                      'platforms', (
                                        SELECT
                                        COALESCE(json_agg(
                                                  json_build_object(
                                                      'platform_id', p.platform_id,
                                                      'platform_name', p.platform_name,
                                                      'platform_icon', p.platform_icon
                                                  )
                                                )
                                        FILTER (WHERE p.platform_id IS NOT NULL), '[]')
                                        FROM platforms p
                                        INNER JOIN games_platforms gp
                                        ON gp.game_id = gb.game_id
                                        AND gp.platform_id = p.platform_id
                                      )
                                    )
                                  )
                                  FROM bundles b, sales s, games_bundles gb
                                  WHERE gb.game_id = $1
                                  AND gb.bundle_id = b.bundle_id
                                  AND b.sale_id = s.sale_id;`;

exports.gamesByBundleIdQueryString = `SELECT
json_agg(
json_build_object(
  'game_id', g.game_id,
  'game_name', g.game_name,
  'game_price', g.game_price,
  'game_banner', g.game_banner,
  'game_release_date', g.game_release_date,
  'game_dev_name', d.dev_name,
  'game_sale_amount', s.sale_amount,
  'platforms', (
                  SELECT
                  COALESCE(json_agg(
                            json_build_object(
                                'platform_id', p.platform_id,
                                'platform_name', p.platform_name,
                                'platform_icon', p.platform_icon
                            )
                          )
                  FILTER (WHERE p.platform_id IS NOT NULL), '[]')
                  FROM platforms p
                  INNER JOIN games_platforms gp
                  ON gp.game_id = g.game_id
                  AND gp.platform_id = p.platform_id
                ),
  'tags', (
            SELECT
              COALESCE(json_agg(
                    json_build_object(
                        'tag_id', t.tag_id,
                        'tag_name', t.tag_name,
                        'tag_icon', t.tag_icon
                    )
                  )
            FILTER (WHERE t.tag_id IS NOT NULL), '[]')
            FROM tags t
            INNER JOIN tags_games tg
            ON tg.tag_id = t.tag_id
            AND tg.game_id = g.game_id
          )
)
)
FROM games g
INNER JOIN games_bundles gb
ON gb.bundle_id = $1
AND gb.game_id = g.game_id
INNER JOIN developers d
ON g.dev_id = d.dev_id
INNER JOIN sales s
ON g.sale_id = s.sale_id;`;
