const jwt = require('jsonwebtoken');
const InvalidToken = require('../models/InvalidToken');

/* eslint-disable consistent-return */
module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    InvalidToken.find({ token }).exec((err, doc) => {
      if (err) {
        return res.status(500).json({
          status: res.statusCode,
          message: 'There was a problem on our side',
        });
      }

      if (doc.length > 0) {
        return res.status(403).json({
          msg: 'Login session has expired please login',
        });
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (_err) => {
        if (_err) {
          if (_err.name === 'TokenExpiredError') {
            return res.status(403).json({
              msg: 'Login session has expired please login',
              expiredAt: _err.expiredAt,
            });
          }
          return res.status(401).json({
            msg: 'Unauthorized user please login to proceed',
          });
        }
        next();
      });
    });
  } else {
    return res.status(401).json({
      msg: 'Unauthorized user please login to proceed',
    });
  }
};
