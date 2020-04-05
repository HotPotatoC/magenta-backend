require('module-alias/register');
require('dotenv').config();
const chalk = require('chalk');
const server = require('@config/express');

const port = process.env.PORT;

console.time(chalk.greenBright('Server Has Started!'));

server.listen(port, () => {
  console.timeEnd(chalk.greenBright('Server Has Started!'));
});
