const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const config = require('.');

const redisClient = redis.createClient(
  config.redisClient.unix_socket,
  config.redisClient.options
);

const options = {
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient,
    ...config.redisStore,
  }),
};

module.exports = {
  session,
  options,
  client: redisClient,
};
