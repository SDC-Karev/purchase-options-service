const request = require('supertest');
const { app } = require('../server/app.js');

const db = require('../server/database');
const results = require('./expectedResults.js');

describe('API Endpoints tests', () => {
  beforeAll(db.add);
  afterAll(db.remove);
  it('server returns 200 status code for base page', (done) => {
    return request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('returns data for game of a given id', (done) => {
    return request(app)
      .get('/api/gameById/201')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(results.gameById.exists);
        done();
      })
      .catch(done.fail);
  });

  it('returns 404 for game of a given id that doesn\'t exist', (done) => {
    return request(app)
      .get('/api/gameById/205')
      .expect(404)
      .then((res) => {
        expect(res.text).toEqual(results.gameById.does_not_exist);
        done();
      })
      .catch(done.fail);
  });

  it('returns data for bundle for given game id', (done) => {
    return request(app)
      .get('/api/bundleByGameId/201')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(results.bundleByGameId.exists);
        done();
      })
      .catch(done.fail);
  });

  it('returns 404 if no bundle has game of given id', (done) => {
    return request(app)
      .get('/api/bundleByGameId/205')
      .expect(404)
      .then((res) => {
        expect(res.text).toEqual(results.bundleByGameId.does_not_exist);
        done();
      })
      .catch(done.fail);
  });
});

// ===========================
//      DATABASE TESTS
// ===========================
describe('Database Tests', () => {
  beforeAll(db.add);
  afterAll(db.remove);
  it('can run plain sql queries to database', (done) => {
    return db.query('SELECT * FROM games WHERE game_id = ?', [201])
      .then((data) => {
        expect(data.length).toBe(1);
        done();
      })
      .catch(done.fail)
  });

  it('gameById database wrapper function returns proper results for existing Id', (done) => {
    return db.gameById(201)
      .then((data) => {
        expect(data).toEqual(results.gameById.exists);
        done();
      })
      .catch(done.fail);
  });

  it('gameById database wrapper function returns undefined results for non-existant Id', (done) => {
    return db.gameById(205)
      .then((data) => {
        expect(data).toBeUndefined;
        done();
      })
      .catch(done.fail);
  });

  it('bundleByGameId database wrapper function returns proper results for existing Id', (done) => {
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
});
