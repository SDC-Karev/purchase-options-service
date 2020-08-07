const { expect } = require('chai');
const db = require('../database');

describe('Database Test', () => {
  it('return database entry for a game of a given id', (done) => {
    const keys = ['game_id', 'game_name', 'game_price', 'dev_name', 'sale_amount' ];
    db.basicQueries.getGameById(1)
      .then((data) => {
        if (data) {
          const d = data[0];
          keys.forEach((key) => {
            expect(d[key]).to.exist;
          });
        }
        done();
      });
  });

  it('return database entry for a bundle that includes given game id if exists', (done) => {
    const keys = ['bundle_id', 'bundle_name', 'bundle_price', 'sale_amount'];
    db.basicQueries.getBundleByGameID(3)
      .then((data) => {
        if (data) {
          const d = data[0];
          keys.forEach((key) => {
            expect(d[key]).to.exist;
          });
        }
        done();
      });
  });

  it('return database entry for a bundle that includes given game id if exists', (done) => {
    const keys = [ 'game_id', 'game_name', 'game_banner', 'game_release_date', 'dev_name'];
    db.basicQueries.getGamesFromBundleID(3)
      .then((data) => {
        if (data) {
          const d = data[0];
          keys.forEach((key) => {
            expect(d[key]).to.exist;
          });
        }
        done();
      });
  });
});
