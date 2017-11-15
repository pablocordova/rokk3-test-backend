// Get dependencies
require('dotenv').config();
const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mongoose = require('mongoose');

// Get our API routes
const task = require('./routes/task');

var app = express();

/**
 * INITIAL CONFIGURATIONS
 */

// To use helmet
app.use(helmet());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to db
// Config bluebird as Promise, is faster
mongoose.Promise = bluebird;

mongoose.connect(process.env.MONGO_PATH, { useMongoClient: true }, err => {
  if (!err) console.log('Success connection to Mongo!');
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers',
    'X-Requested-With,X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  next();
});

/**
 * ROUTES
 */

app.use('/task', task);

/**
 * INTIALIZE SERVER
 */

// Get port from environment and store in Express
const port = process.env.SERVER_PORT;
app.set('port', port);

// Create HTTP sever
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port);

module.exports = app;