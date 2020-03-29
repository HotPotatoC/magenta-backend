require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const http = require('http');
const morgan = require('morgan');

const app = express();
const { session, options } = require('./session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use(session(options));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Mount Routes
require('../httpd/handlers/index')(app);

module.exports = http.createServer(app);
