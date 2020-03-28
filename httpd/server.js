require("dotenv").config();
const express = require("express"),
  cors = require("cors"),
  config = require("../config"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  redis = require("redis"),
  session = require("express-session");

const app = express();
const redisClient = redis.createClient(config.redis.uri, config.redis.options);
const redisStore = require("connect-redis")(session);
const port = process.env.PORT;

mongoose
  .connect(config.database.uri, config.database.options)
  .catch(err => console.log(err));

redisClient.on("error", err => {
  console.log("❌ Redis error: " + err);
});

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new redisStore({
      client: redisClient
    })
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
  app.use(morgan("dev"));
}

// Handlers
require("./handlers/index")(app);
app.listen(port, () => {
  console.log(`✅ Listening server on 127.0.0.1:${port}`);
});
