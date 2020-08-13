var { app } = require('./server/app.js');

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
