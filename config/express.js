const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const config = require('.');
const { session, options } = require('./session');

mongoose.connect(config.database.uri, config.database.options).catch((err) => {
  console.log(`❌ Database Connection Error: ${err}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use(session(options));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Mount Routes
app.use('/auth', require('@api/auth/routes'));
app.use(
  '/posts',
  require('@api/posts/routes'),
  require('@api/comments/routes')
);
app.use('/users', require('@api/users/routes'));

app.get('/status', (req, res) => {
  res.json({
    duration: Math.floor(process.uptime()),
    message: `Server is up for ${Math.floor(process.uptime())}`,
  });
});

/* eslint-disable no-unused-vars */
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message,
      error: err,
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: 'There was a problem on our side.',
  });
});

module.exports = http.createServer(app);
