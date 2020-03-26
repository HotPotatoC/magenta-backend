require("dotenv").config();
const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;
const server = require("http").createServer(app);

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .catch(err => console.log(err));

// Handlers
require("./handlers/index")(app);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

if (!process.env.NODE_ENV === "production") {
  app.use(cors());
  app.use(morgan("dev"));
}

server.listen(port, () => {
  console.log(`Listening server on 127.0.0.1:${port}`);
});
