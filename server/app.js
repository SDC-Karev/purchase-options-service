const path = require('path');
const express = require('express');
const db = require('./database');

const PORT = 3002;

const app = express();

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
