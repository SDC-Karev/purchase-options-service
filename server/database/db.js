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
                                                SELECT json_agg(
                                                          json_build_object(
                                                              'platform_id', p.platform_id,
                                                              'platform_name', p.platform_name,
                                                              'platform_icon', p.platform_icon
                                                          )
                                                        )
                                                FROM platforms p, games_platforms gp
                                                WHERE gp.game_id = g.game_id
                                                AND gp.platform_id = p.platform_id
                                              ),
                                'tags', (
                                          SELECT json_agg(
                                                  json_build_object(
                                                      'tag_id', t.tag_id,
                                                      'tag_name', t.tag_name,
                                                      'tag_icon', t.tag_icon
                                                  )
                                                )
                                          FROM tags t, tags_games tg
                                          WHERE tg.tag_id = t.tag_id
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
                                      'sale_amount', s.sale_amount
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
                                                            SELECT json_agg(
                                                                      json_build_object(
                                                                          'platform_id', p.platform_id,
                                                                          'platform_name', p.platform_name,
                                                                          'platform_icon', p.platform_icon
                                                                      )
                                                                    )
                                                            FROM platforms p, games_platforms gp
                                                            WHERE gp.game_id = g.game_id
                                                            AND gp.platform_id = p.platform_id
                                                          ),
                                            'tags', (
                                                      SELECT json_agg(
                                                              json_build_object(
                                                                  'tag_id', t.tag_id,
                                                                  'tag_name', t.tag_name,
                                                                  'tag_icon', t.tag_icon
                                                              )
                                                            )
                                                      FROM tags t, tags_games tg
                                                      WHERE tg.tag_id = t.tag_id
                                                      AND tg.game_id = g.game_id
                                                    )
                                        )
                                        )
                                        FROM games g, developers d, sales s, games_bundles gb
                                        WHERE gb.bundle_id = $1
                                        AND gb.game_id = g.game_id
                                        AND g.dev_id = d.dev_id
                                        AND g.sale_id = s.sale_id;`;
