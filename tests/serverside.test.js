const axios = require('axios');
const db = require('../server/database');
const results = require('./expectedResults.js');

beforeAll(db.add);
afterAll(db.remove);

test('server returns 200 status code for base page', (done) => {
  return axios.get('http://127.0.0.1:3002/')
    .then((res) => {
      expect(res).not.toBeUndefined;
      expect(res.status).toBe(200);
      done();
    })
    .catch(done.fail);

});

test('returns data for game of a given id', (done) => {
  return axios.get('http://127.0.0.1:3002/api/gameById/201')
    .then((res) => {
      expect(res).not.toBeUndefined;
      expect(res.status).toBe(200);
      expect(res.data).toEqual(results.gameById.exists)
      done();
    })
    .catch(done.fail);
});

test('returns 404 for game of a given id that doesn\'t exist', (done) => {
  return axios.get('http://127.0.0.1:3002/api/gameById/205')
    .then(done.fail)
    .catch((res) => {
      expect(res).not.toBeUndefined;
      expect(res.response.status).toBe(404);
      expect(res.response.data).toBe(results.gameById.does_not_exist);
      done();
    });
});

test('returns data for bundle for given game id', (done) => {
  return axios.get('http://127.0.0.1:3002/api/bundleByGameId/201')
    .then((res) => {
      expect(res).not.toBeUndefined;
      expect(res.status).toBe(200);
      expect(res.data).toEqual(results.bundleByGameId.exists)
      done()
    })
    .catch(done.fail);
});

test('returns 404 if no bundle has game of given id', (done) => {
  return axios.get('http://127.0.0.1:3002/api/bundleByGameId/205')
    .then(done.fail)
    .catch((res) => {
      expect(res).not.toBeUndefined;
      expect(res.response.status).toBe(404);
      expect(res.response.data).toBe(results.bundleByGameId.does_not_exist);
      done();
    });
});

// ===========================
//      DATABASE TESTS
// ===========================

test('can run plain sql queries to database', (done) => {
  return db.query('SELECT * FROM games WHERE game_id = ?', [201])
    .then((data) => {
      expect(data.length).toBe(1);
      done();
    })
    .catch(done.fail)
});

test('gameById database wrapper function returns proper results for existing Id', (done) => {
  return db.gameById(201)
    .then((data) => {
      expect(data).toEqual(results.gameById.exists);
      done();
    })
    .catch(done.fail);
});

test('gameById database wrapper function returns undefined results for non-existant Id', (done) => {
  return db.gameById(205)
    .then((data) => {
      expect(data).toBeUndefined;
      done();
    })
    .catch(done.fail);
});

test('bundleByGameId database wrapper function returns proper results for existing Id', (done) => {
  return db.bundleByGameId(201)
    .then((data) => {
      expect(data).toEqual(results.bundleByGameId.exists);
      done();
    })
    .catch(done.fail);
});

test('bundleByGameId database wrapper function returns undefined results for non-existant Id', (done) => {
  return db.bundleByGameId(205)
    .then((data) => {
      expect(data).toBeUndefined;
      done();
    })
    .catch(done.fail);
});