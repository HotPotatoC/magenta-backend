const mongoose = require('mongoose');
const chalk = require('chalk');
const server = require('./config/express');

const port = process.env.PORT;
const config = require('./config');

console.time(chalk.greenBright('Connected to database!'));
console.time(chalk.greenBright('Server Has Started!'));

mongoose.set('useCreateIndex', true);

mongoose
  .connect(config.database.uri, config.database.options)
  .then(() => {
    console.timeEnd(chalk.greenBright('Connected to database!'));

    server.listen(port, () => {
      console.timeEnd(chalk.greenBright('Server Has Started!'));
      if (process.env.NODE_ENV !== 'production') {
        console.log(`
        Server started at: ${chalk.bgMagenta(`127.0.0.1:${port}`)}
        MongoDB: ${config.database.uri}/${config.database.options.dbName}
        Redis: ${config.redis.unix_socket}
        `);
      }
    });
  })
  .catch((err) => {
    console.log(chalk.red(`❌ Database Connection Error: ${err}`));
  });
