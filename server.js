require('dotenv').config();
require('module-alias/register');
const server = require('@config/express');

server.listen(process.env.PORT, () => {
  console.log(`Server Has Started on 127.0.0.1:${process.env.PORT}`);
});
