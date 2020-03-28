const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({email: email}, (err, user) => {
      if (err) return reject({err, status: 500});
      if (!user) return reject({err, status: 401});

      User.comparePassword(password, user.password, (err, same) => {
        if (err) return reject({err, status: 500});
        if (!same) return reject({err, status: 401});

        const token = jwt.sign(
          {userId: user._id},
          process.env.JWT_SECRET_KEY,
          config.jwt.options
        );
        resolve({
          token,
          user,
          status: 200
        });
      });
    });
  });
};

const checkToken = token => {
  //
};

module.exports = {
  login
};
