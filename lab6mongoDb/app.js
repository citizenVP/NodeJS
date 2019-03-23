const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('./config');
var path = require("path");

// database
mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION);
mongoose.connection
  .on('error', error => console.log(error))
  .on('close', () => console.log('Database connection closed.'))
  .once('open', () => {
    const info = mongoose.connections[0];
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  });
mongoose.connect(config.MONGO_URL, { useMongoClient: true });

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// routers
app.use('/merchandise', routes.merchandise);
app.use('/client', routes.client);
app.use('/seller', routes.seller);
app.use('/search', routes.search);
app.use('/market', routes.market);
app.use('/order', routes.order);

app.listen(config.PORT, () =>
  console.log(`app listening on port ${config.PORT}!`)
);