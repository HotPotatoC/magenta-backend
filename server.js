const mongoose = require('mongoose');
const chalk = require('chalk');
const server = require('./config/express');

const port = process.env.PORT;
const config = require('./config');

mongoose.set('useCreateIndex', true);

mongoose
  .connect(config.database.uri, config.database.options)
  .then(() => {
    console.log(chalk.greenBright('Connected to database!'));

    server.listen(port, () => {
      console.log(chalk.greenBright('Server Has Started!'), '\n');
      if (process.env.NODE_ENV !== 'production') {
        console.log(`
        Server started at: ${chalk.bgMagenta(`127.0.0.1:${port}`)}
        `);
      }
    });
  })
  .catch((err) => {
    console.log(chalk.red(`❌ Database Connection Error: ${err}`));
  });
