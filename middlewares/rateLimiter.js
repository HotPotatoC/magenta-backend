const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const { client: redisClient } = require('../config/session');

const limiter = new RateLimit({
  store: new RedisStore({
    client: redisClient,
    expiry: 5 * 60, // 5 minutes
  }),
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100,
  message: {
    status: 429,
    message: 'Too many requests, please try again later',
  },
});

module.exports = limiter;
