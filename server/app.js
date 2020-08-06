var express = require('express');
var db = require('./database');


const PORT = 3002;

var app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../public'));


app.get('/api/gameById/:id', (req, res) => {
  var id = req.params.id;
  console.log(id);
  console.log(db);
  db.gameById(id)
    .then(data => {
      res.status(200).json(data[0]);
    })
    .catch(err => {
      res.status(500).send(err.message);
    })

})

app.get('/api/bundleByGameId/:gameId', (req, res) => {
  var id = req.params.gameId;
  db.bundleByGameId(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send(err.message);
    })
})



app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
})