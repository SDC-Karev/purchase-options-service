-- CREATE MAIN TABLES

CREATE TABLE games (
  game_id             SERIAL,
  game_name           varchar(255) NOT NULL,
  game_price          float NOT NULL,
  game_banner         varchar(255) NOT NULL,
  game_release_date   date NOT NULL,
  dev_name              varchar(60) NOT NULL,
  sale_amount             float DEFAULT null,
  platforms           jsonb NOT NULL DEFAULT '[]'::jsonb,
  tags                jsonb NOT NULL DEFAULT '[]'::jsonb

);
\copy games FROM './csv_data/games.csv' QUOTE '^' DELIMITER '|' CSV;


CREATE TABLE bundles (
  bundle_id           SERIAL,
  bundle_name         varchar(255) NOT NULL,
  bundle_price        float NOT NULL,
  sale_amount             float DEFAULT null,
  platforms           jsonb NOT NULL DEFAULT '[]'::jsonb
);
\copy bundles FROM './csv_data/bundles.csv' QUOTE '^' DELIMITER '|' CSV;


CREATE TABLE games_bundles (
  game_id             int,
  bundle_id           int
);
\copy games_bundles FROM './csv_data/games_bundles.csv' DELIMITER ',' CSV;




-- ADD PRIMARY KEY CONSTRAINTS TO MAIN TABLES

ALTER TABLE games ADD PRIMARY KEY (game_id);
ALTER TABLE bundles ADD PRIMARY KEY (bundle_id);


-- DELETE DUPLICATE ENTRIES

DELETE FROM games_bundles a
USING games_bundles b
WHERE a.ctid < b.ctid
AND a.game_id = b.game_id
AND a.bundle_id = b.bundle_id;

-- add primary key constraints to join tables
ALTER TABLE games_bundles ADD PRIMARY KEY (game_id, bundle_id);

-- add foreign key constraints to join tables

ALTER TABLE games_bundles ADD CONSTRAINT fk_gb_link_games FOREIGN KEY (game_id) REFERENCES games;
ALTER TABLE games_bundles ADD CONSTRAINT fk_gb_link_bundles FOREIGN KEY (bundle_id) REFERENCES bundles;

CREATE UNIQUE INDEX games_index ON games (game_id);
CREATE UNIQUE INDEX bundles_index ON bundles (bundle_id);
CREATE UNIQUE INDEX games_bundles_index on games_bundles (bundle_id, game_id);


CREATE USER gamer WITH PASSWORD 'halomarine';
GRANT ALL PRIVILEGES ON DATABASE 'purchase-options' TO USER gamer;
GRANT ALL PRIVILEGES ON TABLE games, bundles, games_bundles TO gamer;
select setval('games_game_id_seq', (select max(game_id) from games));
grant all privileges on sequence games_game_id_seq to gamer;

