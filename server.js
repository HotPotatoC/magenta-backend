const mongoose = require('mongoose');
const server = require('./config/express');

const port = process.env.PORT;
const config = require('./config');

console.log(config);

mongoose.set('useCreateIndex', true);
mongoose
  .connect(config.database.uri, config.database.options)
  .then(() => {
    console.log(
      `✅ Connected to database: ${config.database.uri}/${config.database.options.dbName}`
    );
  })
  .catch((err) => {
    console.log(`❌ Database Connection Error: ${err}`);
    process.exit();
  });

server.listen(port, () => {
  console.log(`✅ Listening server on 127.0.0.1:${port}`);
});
