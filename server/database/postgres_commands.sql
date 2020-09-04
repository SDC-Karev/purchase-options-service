select g.game_id, g.game_name, g.game_price, g.game_banner, g.game_release_date, d.dev_name, s.sale_amount, p.platform_id, p.platform_name, p.platform_icon, t.tag_id, t.tag_name, t.tag_icon from games g, developers d, sales s, platforms p, tags t, games_platforms gp, tags_games tg where g.dev_id = d.dev_id and g.sale_id = s.sale_id and gp.game_id = g.game_id and gp.platform_id = p.platform_id and tg.tag_id = t.tag_id and tg.game_id = g.game_id and g.game_id = '9999995';


select g.game_id, g.game_name, g.game_price, g.game_banner, g.game_release_date, d.dev_name, s.sale_amount, p.platform_id, p.platform_name, p.platform_icon, t.tag_id, t.tag_name, t.tag_icon from games g, developers d, sales s, platforms p, tags t, games_platforms gp, tags_games tg where g.dev_id = d.dev_id and g.sale_id = s.sale_id and gp.game_id = g.game_id and gp.platform_id = p.platform_id and tg.tag_id = t.tag_id and tg.game_id = g.game_id and g.game_id = '9999995';




SELECT
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
WHERE g.game_id = 9999992 and g.dev_id = d.dev_id and g.sale_id = s.sale_id;


SELECT
  json_agg(
    json_build_object(
      'bundle_id', b.bundle_id,
      'bundle_name', b.bundle_name,
      'bundle_price', b.bundle_price,
      'sale_amount', s.sale_amount
    )
  )
FROM bundles b, sales s, games g, games_bundles gb
WHERE g.game_id = 7998888
AND gb.game_id = g.game_id
AND gb.bundle_id = b.bundle_id
AND b.sale_id = s.sale_id;
















SELECT
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

  FROM games g, developers d, sales s, games_bundles gb
  WHERE gb.bundle_id = 2000000
  AND gb.game_id = g.game_id
  AND g.dev_id = d.dev_id
  AND g.sale_id = s.sale_id;



  SELECT
  json_agg(
    json_build_object(
      'game_id', g.game_id,
      'game_name', g.game_name,
      'game_price', g.game_price,
      'game_banner', g.game_banner,
      'game_release_date', g.game_release_date,
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
  FROM games_bundles gb, games g
  WHERE gb.bundle_id = 150009
  AND gb.game_id = g.game_id;