const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');
const config = require('../config');

/* eslint-disable consistent-return */
const login = (email, password) => {
  return new Promise((resolve, reject) => {
    const validationSchema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(1024).required(),
    });
    const validation = Joi.validate({ email, password }, validationSchema);

    if (validation.error) {
      return reject({ err: validation.error, status: 400 });
    }

    User.findOne({ email }, (err, user) => {
      if (err) return reject({ err, status: 500 });
      if (!user) return reject({ err, status: 401 });

      User.comparePassword(password, user.password, (_err, same) => {
        if (_err) return reject({ err, status: 500 });
        if (!same) return reject({ err, status: 401 });

        const token = jwt.sign(
          { userId: user._id, username: user.username, email: user.email },
          process.env.ACCESS_TOKEN_KEY,
          config.jwt.options
        );
        return resolve({
          token,
          user,
          status: 200,
        });
      });
    });
  });
};

const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
};

module.exports = {
  login,
  checkToken,
};
