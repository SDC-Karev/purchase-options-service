var express = require('express');
var db = require('./database');


const PORT = 3002;

var app = express();

app.use(express.static(__dirname + '/../public'));


app.get('/api/gameById/:id', (req, res) => {
  var id = req.params.id;
  db.gameById(id)
    .then(data => {
      if (data.length !== 0) {
        res.status(200).json(data[0]);
      } else {
        res.status(404).send('Game not found');
      }
    })
    .catch(errMessage => {
      res.status(500).send(errMessage);
    })

})

app.get('/api/bundleByGameId/:gameId', (req, res) => {
  var id = req.params.gameId;
  db.bundleByGameId(id)
    .then(data => {
      if (data.length !== 0) {
        res.status(200).json(data);
      } else {
        res.status(404).send('No bundles found');
      }
    })
    .catch(errMessage => {
      res.status(500).send(errMessage);
    })
})



app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
})