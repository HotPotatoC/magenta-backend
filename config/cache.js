const redis = require('redis');
const config = require('.');

const redisClient = redis.createClient(
  config.redisClient.unix_socket,
  config.redisClient.options
);

module.exports = {
  redisClient,
};
