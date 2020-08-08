const { expect } = require('chai');
const axios = require('axios');

describe('API Tests', () => {
  it('return a game database entry with tags when requested', (done) => {
    axios.get('http://127.0.0.1:3002/api/gameById/3')
      .then((res) => {
        expect(res).to.exist;
        expect(res.status).to.equal(200);
        const data = res.data;
        expect(data.game_id).to.exist;
        expect(data.game_name).to.exist;
        expect(data.game_price).to.exist;
        expect(data.sale_amount).to.exist;
        expect(data.game_banner).to.exist;
        expect(data.dev_name).to.exist;
        done();
      })
      .catch(err => {
        expect(err).to.not.exist;
      });
  });

  it ('returns a 404 error when no games of id are found', (done) => {
    axios.get('http://127.0.0.1:3002/api/gameById/105')
      .catch(err => {
        expect(err).to.exist;
        expect(err.response.status).to.equal(404);
        done();
      });
  });

  it ('return a bundle database entry with tags when requested', (done) => {
    axios.get('http://127.0.0.1:3002/api/bundleByGameId/3')
      .then((res) => {
        expect(res).to.exist;
        done();
      })
      .catch(err => {
        expect(err).to.not.exist;
      });
  });

  it ('returns a 404 error when no bundles containing gameId are found', (done) => {
    axios.get('http://127.0.0.1:3002/api/bundleByGameId/105')
      .catch(err => {
        expect(err).to.exist;
        expect(err.response.status).to.equal(404);
        done();
      });
  });
});
