const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const config = require('.');

const redisClient = redis.createClient();

const options = {
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient,
    ...config.redis,
  }),
};

console.log(options);

module.exports = {
  session,
  options,
  client: redisClient,
};
