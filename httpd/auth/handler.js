require('module-alias/register');

const config = require('@config');
const services = require('@services');

async function loginHandler(req, res) {
  const { email, password } = req.body;

  try {
    const { token, user, status } = await services.auth.login(email, password);
    req.session.user = user;
    req.session.token = token;

    return res.status(status).json({
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
  } catch (error) {
    if (error.status === 400) {
      const detail = error.err.details[0];
      return res.status(400).json({
        message: detail.message,
        context: detail.context,
      });
    }

    if (error.status === 500) {
      return res.status(500).json({
        status: res.statusCode,
        message: 'There was a problem on our side.',
      });
    }

    return res.status(error.status).json({
      message: 'Unauthorized user please login to proceed',
    });
  }
}

async function registerHandler(req, res) {
  const payload = req.body;

  try {
    await services.users.registerNewUser(payload);

    return res.status(201).json({
      message: 'Successfully registered a new account!',
    });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        message: error.details[0].message,
        context: error.details[0].context,
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
}

async function checkToken(req, res) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = await services.auth.checkToken(token);

      return res.status(200).json({
        valid: true,
        message: 'Token still valid',
        payload: {
          userId: decoded.userId,
          username: decoded.username,
          email: decoded.email,
        },
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(403).json({
          valid: false,
          message: 'Login session has expired please login',
          expiredAt: error.expiredAt,
        });
      }
      return res.status(401).json({
        valid: false,
        message: 'Unauthorized user please login to proceed',
        error,
      });
    }
  } else {
    return res.status(401).json({
      valid: false,
      message: 'Unauthorized user please login to proceed',
    });
  }
}

module.exports = {
  loginHandler,
  registerHandler,
  checkToken,
};
