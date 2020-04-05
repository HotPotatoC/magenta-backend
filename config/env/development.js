module.exports = {
  database: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      dbName: process.env.MONGODB_NAME,
    },
  },
  redis: {
    unix_socket: process.env.REDISCLOUD_URL,
    options: {
      no_ready_check: true,
    },
  },
};
