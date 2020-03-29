/* eslint-disable global-require */
const fs = require('fs');

const handlerDir = './httpd/handlers/';
// Automatically requires all the handlers
module.exports = (app) => {
  fs.readdir(handlerDir, (err, directories) => {
    if (err) throw err;

    directories.forEach((directory) => {
      if (!directory.endsWith('.js')) {
        fs.readdir(handlerDir + directory, (_err, file) => {
          if (_err) throw _err;

          const handler = require(`./${directory}/${file[0]}`);
          app.use(handler.path, handler.router);
        });
      }
    });
  });
};
