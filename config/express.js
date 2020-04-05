require('module-alias/register');

const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const http = require('http');
const morgan = require('morgan');

const app = express();
const { session, options } = require('@config/session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use(session(options));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Mount Routes
app.use('/auth', require('@httpd/auth/routes'));
app.use('/posts', require('@httpd/posts/routes'));
app.use('/users', require('@httpd/users/routes'));

module.exports = http.createServer(app);
