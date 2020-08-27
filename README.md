# Purchase Options

> A Purchase Options component for our Front End Design of Steam

## Related Projects

  - https://github.com/hrr47-FEC-Bailey/media-window
  - https://github.com/hrr47-FEC-Bailey/reviews
  - https://github.com/hrr47-FEC-Bailey/similar-games
  - httos://github.com/hrr47-FEC-Bailey/game-sidebar

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Start the server via
```npm start```
> Start all other components & proxy. The same way

## CRUD API Endpoints

Games:

GET --> '/api/gameById/:id' : GET GAME BY GAME ID
PUT --> '/api/gameById/:id' : UPDATE GAME BY GAME ID, UPDATABLE FIELDS INCLUDE: game_name(varchar), game_price(int), game_banner(varchar), game_release_date('YYYY-MM-DD'), dev_id(int), and sale_id(int) PLEASE USE JSON FORMAT IN REQ.BODY
DELETE --> '/api/gameById/:id : DELETE GAME

POST --> '/api/games/' : POST NEW GAME, INCLUDE FOLLOWING FIELDS IN REQ.BODY as JSON: game_name(varchar), game_price(int), game_banner(varchar), game_release_date('YYYY-MM-DD'), dev_id(int), and sale_id

Bundles:

GET --> '/api/bundleByGameId/:game_id' : GET ALL BUNDLES ASSOCIATED WITH THIS GAME
POST --> '/api/bundleByGameId/:game_id' : POST NEW BUNDLE AND CREATE ASSOCIATION WITH THIS GAME, INCLUDE FOLLOWING FIELDS as JSON in REQ.BODY: bundle_name(varchar), bundle_price(int), sale_id(int)

POST --> '/api/bundles' : SAME AS ABOVE WITHOUT CREATING ANY ASSOCIATIONS TO GAMES
PUT --> '/api/bundles/:id' :  UPDATE BUNDLE BY BUNDLE ID, INCLUDE FOLLOWING FIELDS AS JSON IN REQ.BODY:  bundle_name(varchar), bundle_price(int), sale_id(int)
GET --> '/api/bundles/:id' : GET BUNDLE BY BUNDLE ID
DELETE --> '/api/bundles/:id' : DELETE BUNDLE BY BUNDLE ID

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
