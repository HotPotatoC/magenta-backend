require('dotenv').config();
require('module-alias/register');
const chalk = require('chalk');
const server = require('@config/express');

server.listen(process.env.PORT, () => {
  console.log(
    chalk.greenBright(`Server Has Started on 127.0.0.1:${process.env.PORT}`)
  );
});
