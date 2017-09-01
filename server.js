const config = require('./server/config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport =  require('./server/config/passport');
const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Auth
app.use(passport.initialize());

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
app.set('port', config.port);

app.listen(config.port, () => console.log(`Running on localhost:${config.port}`));

module.exports = app;
