-- CREATE MAIN TABLES

CREATE TABLE games (
  game_id             SERIAL,
  game_name           varchar(255) NOT NULL,
  game_price          float NOT NULL,
  game_banner         varchar(255) NOT NULL,
  game_release_date   date NOT NULL,
  dev_id              int NOT NULL,
  sale_id             int DEFAULT null
);
\copy games FROM './csv_data/games.csv' DELIMITER ',' CSV;
-- COPY games FROM './csv_data/games.csv' WITH (FORMAT csv);

CREATE TABLE bundles (
  bundle_id           SERIAL,
  bundle_name         varchar(255) NOT NULL,
  bundle_price        float NOT NULL,
  sale_id             int DEFAULT null
);
\copy bundles FROM './csv_data/bundles.csv' DELIMITER ',' CSV;


CREATE TABLE developers (
  dev_id              SERIAL,
  dev_name            varchar(255) NOT NULL,
  dev_found_date      date NOT NULL
);
\copy developers FROM './csv_data/developers.csv' DELIMITER ',' CSV;

CREATE TABLE platforms (
  platform_id         SERIAL,
  platform_name       varchar(255) NOT NULL,
  platform_class      varchar(60) NOT NULL,
  platform_icon       varchar(255) NOT NULL
);
\copy platforms FROM './csv_data/platforms.csv' DELIMITER ',' CSV;

CREATE TABLE sales (
  sale_id             SERIAL,
  sale_name           varchar(255) NOT NULL,
  sale_amount         float NOT NULL,
  sale_start_date     date NOT NULL,
  sale_end_date       date NOT NULL
);
\copy sales FROM './csv_data/sales.csv' DELIMITER ',' CSV;

CREATE TABLE tags (
  tag_id              SERIAL,
  tag_name            varchar(255) NOT NULL,
  tag_icon            varchar(255) NOT NULL
);
\copy tags FROM './csv_data/tags.csv' DELIMITER ',' CSV;



-- CREATE and POPULATE temp tables and then insert data into join tables

-- CREATE TABLE temp_b_p (
--   bundle_id           int,
--   platform_id         int
-- );


CREATE TABLE bundles_platforms (
  bundle_id           int,
  platform_id         int
);
\copy bundles_platforms FROM './csv_data/bundles_platforms.csv' DELIMITER ',' CSV;

-- INSERT INTO bundles_platforms
-- SELECT *
-- FROM temp_b_p
-- ON CONFLICT DO NOTHING;



-- CREATE TABLE temp_g_b (
--   game_id             int,
--   bundle_id           int
-- );



CREATE TABLE games_bundles (
  game_id             int,
  bundle_id           int
);
\copy games_bundles FROM './csv_data/games_bundles.csv' DELIMITER ',' CSV;

-- INSERT INTO games_bundles
-- SELECT *
-- FROM temp_g_b
-- ON CONFLICT DO NOTHING;


-- CREATE TABLE temp_g_p (
--   game_id             int,
--   platform_id         int
-- );



CREATE TABLE games_platforms (
  game_id             int,
  platform_id         int
);
\copy games_platforms FROM './csv_data/games_platforms.csv' DELIMITER ',' CSV;

-- INSERT INTO games_platforms
-- SELECT *
-- FROM temp_g_p
-- ON CONFLICT DO NOTHING;

-- CREATE TABLE temp_t_g (
--   tag_id              int,
--   game_id             int
-- );


CREATE TABLE tags_games (
  tag_id              int,
  game_id             int
);
\copy tags_games FROM './csv_data/tags_games.csv' DELIMITER ',' CSV;

-- INSERT INTO tags_games
-- SELECT *
-- FROM temp_t_g
-- ON CONFLICT DO NOTHING;



-- DROP TABLE temp_b_p, temp_g_b, temp_g_p, temp_t_g;



-- ADD PRIMARY KEY CONSTRAINTS TO MAIN TABLES

ALTER TABLE games ADD PRIMARY KEY (game_id);
ALTER TABLE bundles ADD PRIMARY KEY (bundle_id);
ALTER TABLE developers ADD PRIMARY KEY (dev_id);
ALTER TABLE sales ADD PRIMARY KEY (sale_id);
ALTER TABLE tags ADD PRIMARY KEY (tag_id);
ALTER TABLE platforms ADD PRIMARY KEY (platform_id);

-- add foreign key constraints to main tables
ALTER TABLE games ADD CONSTRAINT fk_games_dev FOREIGN KEY (dev_id) REFERENCES developers;
ALTER TABLE games ADD CONSTRAINT fk_games_sale FOREIGN KEY (sale_id) REFERENCES sales;
ALTER TABLE bundles ADD CONSTRAINT fk_bundle_sale FOREIGN KEY (sale_id) REFERENCES sales;

-- DELETE DUPLICATE ENTRIES

DELETE FROM bundles_platforms a
USING bundles_platforms b
WHERE a.ctid < b.ctid
AND a.bundle_id = b.bundle_id
AND a.platform_id = b.platform_id;

DELETE FROM games_bundles a
USING games_bundles b
WHERE a.ctid < b.ctid
AND a.game_id = b.game_id
AND a.bundle_id = b.bundle_id;

DELETE FROM games_platforms a
USING games_platforms b
WHERE a.ctid < b.ctid
AND a.game_id = b.game_id
AND a.platform_id = b.platform_id;

DELETE FROM tags_games a
USING tags_games b
WHERE a.ctid < b.ctid
AND a.tag_id = b.tag_id
AND a.game_id = b.game_id;

-- add primary key constraints to join tables
ALTER TABLE bundles_platforms ADD PRIMARY KEY (bundle_id, platform_id);
ALTER TABLE games_bundles ADD PRIMARY KEY (game_id, bundle_id);
ALTER TABLE games_platforms ADD PRIMARY KEY (game_id, platform_id);
ALTER TABLE tags_games ADD PRIMARY KEY (tag_id, game_id);

-- add foreign key constraints to join tables

ALTER TABLE bundles_platforms ADD CONSTRAINT fk_bp_link_bundles FOREIGN KEY (bundle_id) REFERENCES bundles;
ALTER TABLE bundles_platforms ADD CONSTRAINT fk_bp_link_platforms FOREIGN KEY (platform_id) REFERENCES platforms;
ALTER TABLE games_bundles ADD CONSTRAINT fk_gb_link_games FOREIGN KEY (game_id) REFERENCES games;
ALTER TABLE games_bundles ADD CONSTRAINT fk_gb_link_bundles FOREIGN KEY (bundle_id) REFERENCES bundles;
ALTER TABLE games_platforms ADD CONSTRAINT fk_gp_link_games FOREIGN KEY (game_id) REFERENCES games;
ALTER TABLE games_platforms ADD CONSTRAINT fk_gp_link_platforms FOREIGN KEY (platform_id) REFERENCES platforms;
ALTER TABLE tags_games ADD CONSTRAINT fk_tg_link_tags FOREIGN KEY (tag_id) REFERENCES tags;
ALTER TABLE tags_games ADD CONSTRAINT fk_tg_link_games FOREIGN KEY (game_id) REFERENCES games;

