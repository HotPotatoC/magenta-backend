const jwt = require('jsonwebtoken');

/* eslint-disable consistent-return */
module.exports = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization;

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      { clockTimestamp: new Date().getTime() },
      (err) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
              msg: 'Login session has expired please login',
              expiredAt: err.expiredAt,
            });
          }
          return res.status(401).json({
            msg: 'Unauthorized user please login to proceed',
          });
        }
        next();
      }
    );
  }
};
