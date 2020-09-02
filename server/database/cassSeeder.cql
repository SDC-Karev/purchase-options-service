create type id (

);

CREATE TYPE tags (
  tag_id    map<text, int>,
  tag_name  map<text, text>,
  tag_icon  map<text, text>,
);

CREATE TYPE platforms (
  platform_id   map<text, int>,
  platform_name map<text, text>,
  platform_icon map<text, text>,
);

CREATE TYPE tags (
  tag map<text, text>,
);

CREATE TYPE platforms (
  platform map<text, text>,
);



CREATE TABLE game (
  game_id           int,
  game_name         text,
  game_price        float,
  game_banner       text,
  game_release_date date,
  game_dev_name     text,
  game_sale_amount  float,
  platforms         list<text>,
  tags              list<text>,
  PRIMARY KEY ((game_id))
);

CREATE TABLE bundles_by_game_id (
  game_id             int,
  bundle_id           int,
  bundle_name         text,
  bundle_price        float,
  bundle_sale_amount  float,
  game_id             int,
  game_name           text,
  game_banner         text,
  game_release_date   date,
  game_dev_name       text,

);

COPY games_by_game_id (game_id, game_name,game_price, game_banner, game_release_date, game_dev_name, game_sale_amount, platforms, tags) FROM '~/hack_reactor/capstones/SDC/purchase-options-service/server/database/csv_data/games_by_game_id.csv' WITH HEADER = FALSE AND DELIMITER = '|' AND MINBATCHSIZE=2 AND MAXBATCHSIZE=10 AND PAGESIZE=10;

copy game (game_id, game_name, game_price, game_banner, game_release_date, game_dev_name, game_sale_amount, platforms, tags) from '~/hack_reactor/capstones/SDC/purchase-options-service/server/database/csv_data/game_2.csv' with delimiter = '|';