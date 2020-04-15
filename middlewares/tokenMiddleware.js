const jwt = require('jsonwebtoken');
const InvalidToken = require('@models/InvalidToken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(' ')[1];

    InvalidToken.findOne({ token }).exec((err, doc) => {
      if (err) {
        return res.status(500).json({
          status: res.statusCode,
          message: 'There was a problem on our side',
        });
      }

      if (doc.length > 0) {
        return res.status(403).json({
          message: 'Login session has expired please login',
        });
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (_err) => {
        if (_err) {
          if (_err.name === 'TokenExpiredError') {
            return res.status(403).json({
              message: 'Login session has expired please login',
              expiredAt: _err.expiredAt,
            });
          }
          return res.status(401).json({
            message: 'Unauthorized user please login to proceed',
          });
        }
        next();
      });
    });
  } else {
    return res.status(401).json({
      message: 'Unauthorized user please login to proceed',
    });
  }
};
