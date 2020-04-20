require('module-alias/register');
require('dotenv').config();
const chalk = require('chalk');
const server = require('@config/express');

server.listen(process.env.PORT, () => {
  console.log(chalk.greenBright('Server Has Started!'));
});
