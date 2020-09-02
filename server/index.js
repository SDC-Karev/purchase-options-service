const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./database/db.js');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public/')));


app.get('/api/gameById/:gameId', (req, res) => {
  console.log(req.params.gameId);
  db.query(db.gameQueryString, [req.params.gameId], (err, game) => {
    if (err) {
      res.status(502).send(err.message);
    } else {
      res.status(200).json(game.rows[0].json_build_object);
    }
  })
});

app.get('/api/bundlesByGameId/:gameId', (req, res) => {
  db.query(db.bundlesQueryString, [req.params.gameId])
    .then((result) => {
      // console.log(result);
      const bundles = result.rows[0].json_agg;
      const bundlePromises = [];
      for (let i = 0; i < bundles.length; i++) {
        bundlePromises.push(db.query(db.gamesByBundleIdQueryString, [bundles[i].bundle_id]));
      }
      Promise.all(bundlePromises)
        .then((results) => {
          console.log(results);
          for (let i = 0; i < bundles.length; i++) {
            bundles[i].games = results[i].rows[0].json_agg;
          }
          return bundles;
        })
        .then((results) => {
          res.status(200).json(results);
        })
        .catch((err) => res.status(502).send(err.message));
    })
    .catch((err) => res.status(502).send(err.message));
});
//   db.query(db.bundlesQueryString, [req.params.gameId], (err, bundles) => {
//     if (err) {
//       res.status(502).send(err.message);
//     } else {
//       bundles.rows.forEach((bundle) => {
//         db.query(db.gamesByBundleIdQueryString, )
//       });



//       res.status(200).json(bundles.rows[0].json_agg);
//     }
//   });
// });



app.listen(port, () => console.log('Listening at port ', port));