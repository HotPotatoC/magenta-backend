require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const app = express();
const config = require('../config');

const redisClient = redis.createClient(config.redis.uri, config.redis.options);
const port = process.env.PORT;

mongoose
  .connect(config.database.uri, config.database.options)
  .catch((err) => console.log(err));

redisClient.on('error', (err) => {
  console.log(`❌ Redis error: ${err}`);
});

app.use(
  session({
    secret: process.env.REDIS_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new RedisStore({
      client: redisClient,
    }),
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
  app.use(morgan('dev'));
}

// Handlers
require('./handlers/index')(app);

app.listen(port, () => {
  console.log(`✅ Listening server on 127.0.0.1:${port}`);
});
