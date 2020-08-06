var expect = require('chai').expect;
var mysql = require('mysql');
var db = require('../database');

describe('Database Test', () => {

  it('return database entry for a game of a given id', function (done) {
    var keys = ['game_id', 'game_name', 'game_price', 'dev_name', 'sale_amount' ];
    db.basicQueries._getGameById(1)
      .then((data) => {
        if (data) {
          var d = data[0];
          keys.forEach((key) => {
            expect(d[key]).to.exist;
          });
        }
        done();
      })
  });

  it('return database entry for a bundle that includes given game id if exists', function (done) {
    var keys = ['bundle_id', 'bundle_name', 'bundle_price', 'sale_amount'];
    db.basicQueries._getBundleByGameID(3)
      .then((data) => {
        if (data) {
          var d = data[0];
          keys.forEach((key) => {
            expect(d[key]).to.exist;
          });
        }
        done();
      })
  });


  it('return database entry for a bundle that includes given game id if exists', function (done) {
    var keys = [ 'game_id', 'game_name', 'game_banner', 'game_release_date', 'dev_name' ];
    db.basicQueries._getGamesFromBundleID(3)
      .then((data) => {
        if (data) {
          var d = data[0];
          keys.forEach((key) => {
            expect(d[key]).to.exist;
          });
        }
        done();
      })
  });



});


