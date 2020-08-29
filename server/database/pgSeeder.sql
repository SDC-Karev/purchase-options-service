CREATE TABLE games (
  game_id             int,
  game_name           varchar(255),
  game_price          float,
  game_banner         varchar(255),
  game_release_date   date,
  dev_id              int,
  sale_id             int
);
\copy games FROM './csv_data/games.csv' DELIMITER ',' CSV;
-- COPY games FROM './csv_data/games.csv' WITH (FORMAT csv);

CREATE TABLE bundles (
  bundle_id           int,
  bundle_name         varchar(255),
  bundle_price        float,
  sale_id             int
);
\copy bundles FROM './csv_data/bundles.csv' DELIMITER ',' CSV;


CREATE TABLE developers (
  dev_id              int,
  dev_name            varchar(255),
  dev_found_date      date
);
\copy developers FROM './csv_data/developers.csv' DELIMITER ',' CSV;

CREATE TABLE platforms (
  platform_id         int,
  platform_name       varchar(255),
  platform_class      varchar(60),
  platform_icon       varchar(255)
);
\copy platforms FROM './csv_data/platforms.csv' DELIMITER ',' CSV;

CREATE TABLE sales (
  sale_id             int,
  sale_name           varchar(255),
  sale_amount         float,
  sale_start_date     date,
  sale_end_date       date
);
\copy sales FROM './csv_data/sales.csv' DELIMITER ',' CSV;

CREATE TABLE tags (
  tag_id              int,
  tag_name            varchar(255),
  tag_icon            varchar(255)
);
\copy tags FROM './csv_data/tags.csv' DELIMITER ',' CSV;

CREATE TABLE temp_b_p (
  bundle_id           int,
  platform_id         int
);
\copy temp_b_p FROM './csv_data/bundles_platforms.csv' DELIMITER ',' CSV;

CREATE TABLE bundles_platforms (
  bundle_id           int,
  platform_id         int
);

INSERT INTO bundles_platforms
SELECT *
FROM temp_b_p
ON CONFLICT DO NOTHING;



CREATE TABLE temp_g_b (
  game_id             int,
  bundle_id           int
);
\copy temp_g_b FROM './csv_data/games_bundles.csv' DELIMITER ',' CSV;


CREATE TABLE games_bundles (
  game_id             int,
  bundle_id           int
);

INSERT INTO games_bundles
SELECT *
FROM temp_g_b
ON CONFLICT DO NOTHING;


CREATE TABLE temp_g_p (
  game_id             int,
  platform_id         int
);
\copy temp_g_p FROM './csv_data/games_platforms.csv' DELIMITER ',' CSV;


CREATE TABLE games_platforms (
  game_id             int,
  platform_id         int
);

INSERT INTO games_platforms
SELECT *
FROM temp_g_p
ON CONFLICT DO NOTHING;

CREATE TABLE temp_t_g (
  tag_id              int,
  game_id             int
);
\copy temp_t_g FROM './csv_data/tags_games.csv' DELIMITER ',' CSV;

CREATE TABLE tags_games (
  tag_id              int,
  game_id             int
);

INSERT INTO tags_games
SELECT *
FROM temp_t_g
ON CONFLICT DO NOTHING;

DROP TABLE temp_b_p, temp_g_b, temp_g_p, temp_t_g;