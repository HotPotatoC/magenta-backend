const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  database: {
    uri: isProduction ? process.env.MONGOLAB_URI : process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGODB_NAME,
    },
  },
  redis: {
    unix_socket: isProduction
      ? process.env.REDISCLOUD_URL
      : process.env.REDIS_URL,
    options: {
      no_ready_check: true,
    },
  },
  jwt: {
    options: {
      algorithm: 'HS256',
      expiresIn: Math.floor(Date.now()) + 60 * 60, // 1 hour
    },
  },
};
