const path = require('path');
const express = require('express');
const cors = require('cors');

const db = require('./database');

const app = express();

app.use(cors())

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/api/gameById/:id', (req, res) => {
  const { id } = req.params;
  db.gameById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send('Game not found');
      }
    })
    .catch((errMessage) => {
      res.status(500).send(errMessage);
    });
});

// new CRUD operations for  'api/gameById/:id' route
app.post('/api/gameById/:id',);
app.put('/api/gameById/:id',);
app.delete('/api/gameById/:id',);


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
app.post('/api/bundleByGameId/:gameId');
app.put('/api/bundleByGameId/:gameId');
app.delete('/api/bundleByGameId/:gameId');

module.exports.app = app;
