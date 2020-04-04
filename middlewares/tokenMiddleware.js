const jwt = require('jsonwebtoken');

/* eslint-disable consistent-return */
module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY,
      { clockTimestamp: new Date().getTime() },
      (err) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(403).json({
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
  } else {
    return res.status(401).json({
      msg: 'Unauthorized user please login to proceed',
    });
  }
};
