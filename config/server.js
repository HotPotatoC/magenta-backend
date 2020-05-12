const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const config = require('.');
const rateLimiter = require('../middlewares/rateLimiter');

mongoose.connect(config.database.uri, config.database.options).catch((err) => {
  console.log(`❌ Database Connection Error: ${err}`);
});

app.use(cors());
app.use(rateLimiter);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (app.get('env') !== 'production') {
  app.use(morgan('dev'));
}

// Mount Routes
app.use('/v1/auth', require('../routes/v1/auth'));
app.use('/v1/users', require('../routes/v1/users'));
app.use(
  '/v1/posts',
  require('../routes/v1/posts'),
  require('../routes/v1/comments')
);

app.get('/status', (req, res) => {
  res.json({
    duration: Math.floor(process.uptime()),
    message: `Server is up for ${Math.floor(process.uptime())}`,
  });
});

/* eslint-disable no-unused-vars */
if (app.get('env') !== 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message,
      error: err,
    });
  });
} else {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: 'There was a problem on our side.',
    });
  });
}

module.exports = http.createServer(app);
