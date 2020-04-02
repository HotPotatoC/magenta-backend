const config = require('../../config');
const services = require('../../services');

const loginHandler = (req, res) => {
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
      if (status === 500) {
        console.log(err);
        res.status(status).json({
          status: res.statusCode,
          message: 'There was a problem on our side.',
        });
        return;
      }

      res.status(status).json({
        msg: 'Unauthorized user please login to proceed',
      });
    });
};

const registerHandler = (req, res) => {
  const payload = req.body;

  services.users.registerNewUser(payload, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        status: res.statusCode,
        message: 'There was a problem on our side.',
      });
      return;
    }

    res.status(201).json({
      message: 'Successfully inserted a new user to the collection',
    });
  });
};

const checkToken = (req, res) => {
  const token = req.headers.authorization;

  services.auth.checkToken(token, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          msg: 'Login session has expired please login',
          expiredAt: err.expiredAt,
        });
      }
      return res.status(401).json({
        msg: 'Unauthorized user please login to proceed',
        err,
      });
    }

    return res.status(200).json({
      user_id: decoded.userId,
      msg: 'Token still valid',
    });
  });
};

module.exports = {
  loginHandler,
  registerHandler,
  checkToken,
};
