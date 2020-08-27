const path = require('path');
const express = require('express');
const cors = require('cors');

const db = require('./database');

const app = express();

app.use(cors())

app.use(express.static(path.join(__dirname, '/../public')));
app.use('games/:game_id', express.static(path.join(__dirname, '/../public')));
app.use(express.json());


app.get('/api/gameById/:id', (req, res) => {
  const { id } = req.params;
  db.gameById(id)
    .then((data) => {
      if (data.length !== 0) {
        res.status(200).json(data);
      } else {
        res.status(404).send('error getting game');
      }
    })
});

// new CRUD operations for  'api/gameById/:id' route
app.post('/api/games/', (req, res) => {
  db.postNewGame(req.body)
    .then((result) => {
      res.status(200).json(result)
    })
    .catch(() => res.status(404).send('error posting game'))
});
app.put('/api/gameById/:id', (req, res) => {
  req.body.game_id = req.params.id;
  console.log(req.body);
  db.updateGameByData(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.status(404).send('error updating game'))
});
app.delete('/api/gameById/:id', (req, res) => {
  db.deleteGameById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.status(404).send('error deleting game'))
});


app.get('/api/bundleByGameId/:gameId', (req, res) => {
  const { gameId } = req.params;

  db.bundleByGameId(gameId)
    .then((data) => {
      if (data.length !== 0) {
        res.status(200).json(data);
      } else {
        res.status(404).send('No bundles found');
      }
    })
    .catch((errMessage) => {
      res.status(500).send(errMessage);
    });
});

// new CRUD operations for  'api/bundleByGameId/:gameId' route
app.post('/api/bundleByGameId/:gameId', (req, res) => {
  console.log('params ', req.params);
  console.log(req.body);
  let data = {
    bundle_name: req.body.bundle_name,
    bundle_price: req.body.bundle_price,
    sale_id: req.body.sale_id,
    gameId: req.params.gameId
  }
  db.postBundleByGameId(data)
    .then((results) => {
      if (results.length !== 0) {
        res.status(200).json(results);
      } else {
        res.status(404).send('Error creating new bundle');
      }
    })
    .catch((errMessage) => {
      res.status(500).send(errMessage);
    })
});

app.post('/api/bundles', (req, res) => {
  db.postNewBundle(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.status(404).send('error posting bundle'))
})

app.get('/api/bundles/:id', (req, res) => {
  db.getBundleByBundleId(req.params.id)
    .then((result) => {
      res.status(200).json(result)
    })
    .catch(() => res.status(404).send('error fetching bundle'))
})
app.put('/api/bundles/:id', (req, res) => {
  req.body.bundle_id = req.params.id;
  db.updateBundleByBundleId(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.status(404).send('error updating bundle'))
});
app.delete('/api/bundles/:id', (req, res) => {
  db.deleteBundleByBundleId(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.status(404).send('error deleting bundle'))
});

module.exports.app = app;
