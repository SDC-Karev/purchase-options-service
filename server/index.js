require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./database/db.js');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public/')));
app.use('/games/:gameId', express.static(path.resolve(__dirname, '../public/')));

app.get('/api/gameById/:gameId', (req, res) => {
  // console.log(req.params.gameId);
  db.query(db.gameQueryString, [req.params.gameId])
    .then((game) => {
      res.status(200).json(game.rows[0].json_build_object);
    })
    .catch((err) => {
      res.status(502).send(err.message);
    });
});

app.get('/api/bundlesByGameId/:gameId', (req, res) => {
  // console.log(req.params.gameId);
  db.query(db.bundlesQueryString, [req.params.gameId])
    .then((result) => {
      // console.log('LINE 32', result.rows[0]);
      const bundles = result.rows[0].json_agg;
      const bundlePromises = [];
      for (let i = 0; i < bundles.length; i++) {
        bundlePromises.push(db.query(db.gamesByBundleIdQueryString, [bundles[i].bundle_id]));
      }
      Promise.all(bundlePromises)
        .then((results) => {
          // console.log(results);
          for (let i = 0; i < bundles.length; i++) {
            // console.log(results[i].rows[0].json_agg);
            bundles[i].games = results[i].rows[0].json_agg;
          }
          return bundles;
        })
        .then((results) => {
          res.status(200).json(results);
        })
        .catch((err) => res.status(502).send(err.message));
    })
    .catch(() => res.status(200).json([]));
});

app.post('/api/games', (req, res) => {
  // console.log(req.body);
  // console.log('req');
  db.query(db.postGameQueryString, [
    req.body.game_name,
    req.body.game_price,
    req.body.game_banner,
    req.body.game_release_date,
    req.body.game_dev_name,
    req.body.game_sale_amount,
    JSON.stringify(req.body.platforms),
    JSON.stringify(req.body.tags),
  ])
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => res.status(502).send(err.message));
});

app.listen(port, () => console.log('Listening at port ', port));
