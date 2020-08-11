CREATE DATABASE steam;

USE steam;

CREATE TABLE games (
  game_id int not null auto_increment,
  game_name varchar(255) not null,
  game_price int not null,
  game_banner varchar(255) not null,
  game_release_date date not null,
  dev_id int not null,
  sale_id int default 1,
  primary key (game_id)
);

CREATE TABLE developers (
  dev_id int not null auto_increment,
  dev_name varchar(225) not null,
  dev_found_date date,
  primary key (dev_id)
);

CREATE TABLE sales (
  sale_id int not null auto_increment,
  sale_name varchar(255) not null,
  sale_amount int not null,
  sale_start_date date,
  sale_end_date date,
  primary key (sale_id)
);

CREATE TABLE bundles (
  bundle_id int not null auto_increment,
  bundle_name varchar(255) not null,
  bundle_price int not null,
  sale_id int default 1,
  primary key (bundle_id)
);

CREATE TABLE tags (
  tag_id int not null auto_increment,
  tag_name varchar(255) not null unique,
  tag_icon varchar(255) not null,
  primary key (tag_id)
);

CREATE TABLE tags_games (
  tag_id int not null,
  game_id int not null
);

CREATE TABLE games_bundles (
  game_id int not null,
  bundle_id int not null
);
