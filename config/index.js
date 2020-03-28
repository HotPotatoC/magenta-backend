module.exports = {
  database: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      dbName: process.env.MONGODB_NAME
    }
  },
  redis: {
    uri: process.env.REDIS_URL,
    options: {
      no_ready_check: true
    }
  }
};
