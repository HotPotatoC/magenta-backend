const config = require('../../config');
const services = require('../../services');

function loginHandler(req, res) {
  const { email, password } = req.body;

  services.auth
    .login(email, password)
    .then(({ token, user, status }) => {
      req.session.user = user;
      req.session.token = token;

      res.status(status).json({
        message: 'Successfully logged in',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          img_url: user.img_url,
        },
        token,
        expiresIn: config.jwt.options.expiresIn,
      });
    })
    .catch(({ err, status }) => {
      if (status === 400) {
        const error = err.details[0];
        return res.status(400).json({
          message: error.message,
          context: error.context,
        });
      }

      if (status === 500) {
        return res.status(500).json({
          status: res.statusCode,
          message: 'There was a problem on our side.',
        });
      }

      return res.status(status).json({
        message: 'Unauthorized user please login to proceed',
      });
    });
}

function registerHandler(req, res) {
  const payload = req.body;

  services.users
    .registerNewUser(payload)
    .then(() => {
      return res.status(201).json({
        message: 'Successfully registered a new account!',
      });
    })
    .catch((err) => {
      if (err.isJoi) {
        return res.status(400).json({
          message: err.details[0].message,
          context: err.details[0].context,
        });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).json({
          message: err.message,
        });
      }
      return res.status(500).json({
        status: res.statusCode,
        message: 'There was a problem on our side.',
      });
    });
}

function checkToken(req, res) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    services.auth
      .checkToken(token)
      .then((decoded) => {
        return res.status(200).json({
          userId: decoded.userId,
          username: decoded.username,
          email: decoded.email,
          msg: 'Token still valid',
        });
      })
      .catch((err) => {
        if (err.name === 'TokenExpiredError') {
          return res.status(403).json({
            msg: 'Login session has expired please login',
            expiredAt: err.expiredAt,
          });
        }
        return res.status(401).json({
          msg: 'Unauthorized user please login to proceed',
          err,
        });
      });
  }
}

module.exports = {
  loginHandler,
  registerHandler,
  checkToken,
};
