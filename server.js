const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use('/', routes);

const port = process.env.PORT || 3000;

//app.use('/', require('./routes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port, () => console.log(`Database is listening and running on port ${port}`));
    }
  });
