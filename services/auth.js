const jwt = require('jsonwebtoken');

const User = require('../models/User');
const InvalidToken = require('../models/InvalidToken');
const { validateLogin } = require('../validation/auth');
const config = require('../config');

/**
 * Authenticates user
 *
 * @param {string} email - Email
 * @param {string} password - Password
 */
function login(email, password) {
  return new Promise((resolve, reject) => {
    // Validates login data
    const validation = validateLogin({ email, password });

    if (validation.error) {
      // If validation fails, stop the operation and return a 422 error
      return reject({ err: validation.error, status: 422 });
    }

    // Finds the existing user by email
    User.findOne({ email }, (err, user) => {
      if (err) return reject({ err, status: 500 });

      // If the user with the given email does not exists
      // stop the operation and returns a 401 error
      if (!user) return reject({ err, status: 401 });

      // Compares the given password
      User.comparePassword(password, user.password, (_err, same) => {
        if (_err) return reject({ err: _err, status: 500 });

        // If the given password is invalid, stop the operation and return a 401 error
        if (!same) return reject({ err: _err, status: 401 });

        // Makes a token with userId, username, and email as the payload
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
}

/**
 * Determines whether the given token is valid or not
 *
 * @param {string} token - Valid JWT Token
 */
function checkToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
}

/**
 * Invalidates the given token by inserting the token
 * into the token blacklist collection
 *
 * @param {string} token - Valid JWT Token
 */
function logout(token) {
  return new Promise((resolve, reject) => {
    // Verifies the token
    checkToken(token)
      .then((decoded) => {
        // Check whether the token is already invalid or exists
        // in the token blacklist collection
        InvalidToken.findOne({ token }, (_err, res) => {
          if (_err) return reject({ err: _err, status: 500 });

          // If the token exists, stop the operation and return a 401 error
          if (res) {
            return reject({ status: 401 });
          }

          // Create a new invalid token document instance
          const invalidToken = new InvalidToken({
            user_id: decoded.userId,
            token,
          });

          // Saves the token into the collection
          invalidToken.save((__err, product) => {
            if (__err) return reject({ err: __err, status: 500 });
            return resolve({ product, status: 200 });
          });
        });
      })
      .catch((err) => reject({ err, status: 500 }));
  });
}

module.exports = {
  login,
  logout,
  checkToken,
};
