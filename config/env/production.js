module.exports = {
  database: {
    uri: process.env.MONGOLAB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      dbName: process.env.MONGODB_NAME,
    },
  },
  redis: {
    port: process.env.REDISCLOUD_PORT,
    host: process.env.REDISCLOUD_HOST,
    options: {
      no_ready_check: true,
      password: process.env.REDISCLOUD_PASS,
    },
  },
};
