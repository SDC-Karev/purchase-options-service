# Purchase Options

> A service to handle the purchase options for games and bundles on our app Arcadia

## Related Projects

  - https://github.com/SDC-karev/media-window
  - https://github.com/SDC-karev/reviews
  - https://github.com/SDC-karev/similar-games
  - httos://github.com/SDC-karev/game-sidebar

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Start the server via
```npm start```
> Start all other components & proxy. The same way

## CRUD API Endpoints

### Games:


#### GET
`/api/gameById/:id` 
> GET GAME BY GAME ID


#### POST
`/api/games/` 
> POST NEW GAME, INCLUDE FOLLOWING FIELDS IN REQ.BODY as JSON: game_name(varchar), game_price(int), game_banner(varchar), game_release_date('YYYY-MM-DD'), dev_name(varchar), sale_amount(float), platforms (json) { platform_name: varchar, platform_icon: varchar, platform }, tags (json) {tag_name: varchar, tag_icon: varchar}

### Bundles:

#### GET
`/api/bundleByGameId/:game_id`
GET ALL BUNDLES ASSOCIATED WITH THIS GAME


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
