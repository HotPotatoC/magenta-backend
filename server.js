const mongoose = require('mongoose');
const server = require('./config/express');

const port = process.env.PORT;
const config = require('./config');

mongoose.set('useCreateIndex', true);
mongoose.connect(config.database.uri, config.database.options).catch((err) => {
  console.log(`❌ Database Connection Error: ${err}`);
});

server.listen(port, () => {
  console.log('✅ Server Has Started');
});
