var expect = require('chai').expect;
//var app = require('../app.js');
var axios = require('axios');

describe('API Tests', () => {
  it ('return a game database entry with tags when requested', (done) => {
    axios.get('http://127.0.0.1:3002/api/gameById/3')
      .then((res) => {
        expect(res).to.exist;
        done();
      })
      .catch(err => {
        expect(err).to.not.exist;
      })
  });


  it ('return a bundle database entry with tags when requested', (done) => {
    axios.get('http://127.0.0.1:3002/api/bundleByGameId/3')
      .then((res) => {
        expect(res).to.exist;
        done();
      })
      .catch(err => {
        expect(err).to.not.exist;
      })
  });
})