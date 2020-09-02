select b.bundle_id, b.bundle_name, b.bundle_price, s.sale_amount, g.game_id, g.game_name, g.game_banner, g.game_release_date, t.tag_name, t.tag_icon, p.platform_name, p.platform_icon from bundles b, games g, sales s, tags t, platforms p, games_bundles gb, tags_games tg, games_platforms gp where g.game_id = '58' and b.sale_id = s.sale_id and gb.game_id = g.game_id and gb.bundle_id = b.bundle_id and tg.tag_id = t.tag_id and tg.game_id = g.game_id and gp.game_id = g.game_id and gp.platform_id = p.platform_id;

SELECT json_build_object(
  'bundle_id', json_agg(b.bundle_id),
  'bundle_name', json_agg(b.bundle_name),
  'bundle_price', json_agg(b.bundle_price),
  'sale_amount', json_agg(s.sale_amount),
  'games', json_agg(row_to_json())
      'game_id', g.game_id,
      'game_name', g.game_name,
      'game_banner', g.game_banner,
      'game_release_date', g.game_release_date,
      'dev_name', d.dev_name,
      'tags', [
        {
          'tag_name', t.tag_name,
          'tag_icon', t.tag_icon
        }
      ],
      'platforms', [
        {
          'platform_name', p.platform_name,
          'platform_icon', p.platform_icon
        }
      ]
    }
  ]
)
FROM bundles b, sales s, games g, developers d, tags t, platforms p, games_bundles gb, tags_games tg, games_platforms gp
WHERE g.game_id = '58' and b.sale_id = s.sale_id and gb.game_id = g.game_id and gb.bundle_id = b.bundle_id and tg.tag_id = t.tag_id and tg.game_id = g.game_id and gp.game_id = g.game_id and gp.platform_id = p.platform_id;