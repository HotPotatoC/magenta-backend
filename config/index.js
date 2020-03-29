module.exports = {
  database: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      dbName: process.env.MONGODB_NAME,
    },
  },
  redis: {
    unix_socket: process.env.REDIS_URL,
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
