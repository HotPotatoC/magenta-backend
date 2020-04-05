require('module-alias/register');
require('dotenv').config();
const chalk = require('chalk');
const mongoose = require('mongoose');
const config = require('@config');
const server = require('@config/express');

console.time(chalk.greenBright('Connected to database!'));
console.time(chalk.greenBright('Server Has Started!'));

const port = process.env.PORT;

mongoose
  .connect(config.database.uri, config.database.options)
  .then(() => {
    console.timeEnd(chalk.greenBright('Connected to database!'));
  })
  .catch((err) => {
    console.log(chalk.red(`❌ Database Connection Error: ${err}`));
  });

server.listen(port, () => {
  console.timeEnd(chalk.greenBright('Server Has Started!'));
});
