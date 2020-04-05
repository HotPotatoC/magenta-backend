require('module-alias/register');
require('dotenv').config();
const chalk = require('chalk');
const server = require('@config/express');

console.time(chalk.greenBright('Server Has Started!'));

server.listen(process.env.PORT, () => {
  console.timeEnd(chalk.greenBright('Server Has Started!'));
});
