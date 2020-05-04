const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const config = require('.');

const redisClient = redis.createClient(
  config.redis.unix_socket,
  config.redis.options
);

const options = {
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient,
    ttl: 7200, // 2 hours
  }),
};

module.exports = {
  session,
  options,
  client: redisClient,
};
