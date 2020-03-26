const fs = require("fs");
const handlerDir = "./httpd/handlers/";

// Automatically requires all the handlers
module.exports = app => {
  fs.readdir(handlerDir, (err, directories) => {
    if (err) throw err;

    directories.forEach(directory => {
      if (!directory.endsWith(".js")) {
        fs.readdir(handlerDir + directory, (err, file) => {
          if (err) throw err;

          let handler = require(`./${directory}/${file[0]}`);
          app.use(handler.path, handler.router);
        });
      }
    });
  });
};
