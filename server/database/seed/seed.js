const faker = require('faker');

const db = require('../database.js');
const tags = require('./tags.json');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

// Creates 426 tags
const seedDatabase = () => {
  const m = tags.map((tag) => (
    db.query('INSERT IGNORE INTO tags (tag_name, tag_icon) VALUES (?, ?)', [tag, faker.image.avatar()])
  ));

  return Promise.all(m)
    .then(() => {
      // create 50 sales
      const s = [...Array(50)].map(() => {
        const sale = (getRandomInt(-100, 100) >= 0) ? 0 : getRandomInt(-99, -1);
        return db.query('INSERT INTO sales (sale_name, sale_amount, sale_start_date, sale_end_date)VALUES (?, ?, ?, ?)', [`${faker.hacker.adjective()} ${faker.hacker.noun()} Sale`, sale, faker.date.past(), faker.date.future()]);
      });
      return Promise.resolve(s);
    })
    .then(() => {
      // Create 30 Developers
      const d = [...Array(30)].map(() => (
        db.query('INSERT IGNORE INTO developers (dev_name,  dev_found_date) VALUES (?, ?)', [faker.company.companyName(), faker.date.past()])
      ));
      return Promise.all(d);
    })
    .then(() => {
      // Create 100 Games
      const g = [...Array(100)].map(() => (
        db.query('INSERT IGNORE INTO games (game_name, game_price, game_release_date, dev_id, game_banner, sale_id) VALUES (?, ?, ?, ?, ?, ?)',
          [
            faker.commerce.productName(),
            faker.commerce.price() * 100,
            faker.date.past(),
            getRandomInt(1, 30),
            faker.image.imageUrl(),
            getRandomInt(1, 50),
          ])
      ));
      return Promise.all(g);
    })
    .then(() => {
      // Create 20 bundles
      const b = [...Array(20)].map(() => (
        db.query('INSERT INTO bundles (bundle_name, bundle_price, sale_id) VALUES (?, ?, ?);', [`${faker.commerce.productName()} Bundle`, faker.commerce.price() * 100, getRandomInt(1, 50)])
      ));
      return Promise.all(b);
    })
    .then(() => {
      // add games to bundle
      const gb = [];
      for (let i = 1; i < 21; i += 1) {
        const games = [];
        [...Array(getRandomInt(2, 5))].forEach(() => {
          let game = getRandomInt(1, 100);
          while (games.indexOf(game) !== -1) {
            game = getRandomInt(1, 100);
          }
          games.push(game);
          gb.push(db.query('INSERT INTO games_bundles (game_id, bundle_id) VALUES (?, ?)', [game, i]));
        });
      }
      return Promise.all(gb);
    })
    .then(() => {
      // add tags to the games
      const gt = [];
      for (let i = 1; i < 101; i += 1) {
        const tagsList = [];
        [...Array(getRandomInt(2, 5))].forEach(() => {
          let tag = getRandomInt(1, 426);
          while (tagsList.indexOf(tag) !== -1) {
            tag = getRandomInt(1, 426);
          }
          tagsList.push(tag);
          gt.push(db.query('INSERT INTO tags_games (game_id, tag_id) VALUES (?, ?)', [i, tag]));
        });
      }
      return Promise.all(gt);
    })
    .then(() => {
      // add tags to the games
      const gp = [];
      for (let i = 1; i < 101; i += 1) {
        const platformsList = [];
        [...Array(getRandomInt(1, 3))].forEach(() => {
          let platform = getRandomInt(1, 3);
          while (platformsList.indexOf(platform) !== -1) {
            platform = getRandomInt(1, 3);
          }
          platformsList.push(platform);
          gp.push(db.query('INSERT INTO games_platforms (game_id, platform_id) VALUES (?, ?)', [i, platform]));
        });
      }
      return Promise.all(gp);
    })
    .then(() => {
      // add tags to the games
      const bp = [];
      for (let i = 1; i < 21; i += 1) {
        const platformsList = [];
        [...Array(getRandomInt(1, 3))].forEach(() => {
          let platform = getRandomInt(1, 3);
          while (platformsList.indexOf(platform) !== -1) {
            platform = getRandomInt(1, 3);
          }
          platformsList.push(platform);
          bp.push(db.query('INSERT INTO bundles_platforms (bundle_id, platform_id) VALUES (?, ?)', [i, platform]));
        });
      }
      return Promise.all(bp);
    })
    .then(() => {
      process.exit(0);
    });
};

const addDatabaseTestingEntry = () => (

  db.query('INSERT INTO sales (sale_id, sale_name, sale_amount, sale_start_date, sale_end_date) VALUES (?, ?, ?, ?, ?);',
    [
      201,
      'Test Sale',
      -50,
      new Date('5-1-2019'),
      new Date('5-1-2021'),
    ])
    .then(() => (
      db.query('INSERT IGNORE INTO developers (dev_id, dev_name,  dev_found_date) VALUES (?, ?, ?);', [
        201,
        'Test Developer',
        new Date('5-1-2019'),
      ])
    ))
    .then(() => (
      db.query('INSERT IGNORE INTO games (game_id, game_name, game_price, game_release_date, dev_id, game_banner, sale_id) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [
          201,
          'Test Game',
          5000,
          new Date('5-1-2019'),
          201,
          'img/url',
          201,
        ])
    ))
    .then(() => (
      db.query('INSERT INTO bundles (bundle_id, bundle_name, bundle_price, sale_id) VALUES (?, ?, ?, ?);',
        [
          201,
          'Test Bundle',
          5000,
          201,
        ])
    ))
    .then(() => (
      db.query('INSERT INTO games_bundles (game_id, bundle_id) VALUES (?, ?);', [201, 201])
    ))
    .then(() => (
      db.query('INSERT INTO tags_games (game_id, tag_id) VALUES (?, ?);', [201, 1])
    ))
    .then(() => Promise.resolve())

);

const rmDatabaseTestingEntry = () => (
  db.query('DELETE FROM games WHERE game_id = ?', [201])
    .then(() => db.query('DELETE FROM bundles WHERE bundle_id = ?', [201]))
    .then(() => db.query('DELETE FROM developers WHERE dev_id = ?', [201]))
    .then(() => db.query('DELETE FROM sales WHERE sale_id = ?', [201]))
    .then(() => db.query('DELETE FROM games_bundles WHERE bundle_id = ?', [201]))
    .then(() => db.query('DELETE FROM tags_games WHERE game_id = ?', [201]))
    .then(() => Promise.resolve())
);

module.exports = {
  seedDatabase,
  add: addDatabaseTestingEntry,
  remove: rmDatabaseTestingEntry,
};
