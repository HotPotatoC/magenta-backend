require('module-alias/register');

const config = require('@config');
const services = require('@services');

async function loginHandler(req, res) {
  const { email, password } = req.body;

  try {
    const { token, user } = await services.auth.login(email, password);
    req.session.user = user;
    req.session.token = token;

    return res.status(200).json({
      status: res.statusCode,
      user: {
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
        status: res.statusCode,
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
      status: res.statusCode,
      message: 'Unauthorized user please login to proceed',
    });
  }
}

async function logoutHandler(req, res) {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  try {
    const { status } = await services.auth.logout(token);

    if (status === 401) {
      return res.status(401).json({
        status: res.statusCode,
        valid: false,
        message: 'Unauthorized user please login to proceed',
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      message: 'Successfully logged out!',
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
}

async function registerHandler(req, res) {
  try {
    await services.users.registerNewUser(req.body);

    return res.status(201).json({
      status: res.statusCode,
      message: 'Successfully registered a new account!',
    });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message,
        context: error.details[0].context,
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: res.statusCode,
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
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  try {
    const decoded = await services.auth.checkToken(token);

    return res.status(200).json({
      status: res.statusCode,
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
        status: res.statusCode,
        valid: false,
        message: 'Login session has expired please login',
        expiredAt: error.expiredAt,
      });
    }

    return res.status(401).json({
      status: res.statusCode,
      valid: false,
      message: 'Unauthorized user please login to proceed',
      error,
    });
  }
}

module.exports = {
  loginHandler,
  logoutHandler,
  registerHandler,
  checkToken,
};
