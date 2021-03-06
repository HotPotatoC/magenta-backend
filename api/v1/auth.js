const router = require('express').Router();

const config = require('../../config');
const services = require('../../services');
const tokenMiddleware = require('../../middlewares/tokenMiddleware');

const {
  joiErrorResponseMaker,
  validationErrorResponseMaker,
  getBearerToken,
} = require('../helpers');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await services.auth.login(email, password);

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
    if (error.status === 422) {
      return joiErrorResponseMaker(res, error.err);
    }

    if (error.status === 401) {
      return res.status(401).json({
        status: res.statusCode,
        message: 'Unauthorized user please login to proceed',
      });
    }

    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
});

router.post('/logout', tokenMiddleware, async (req, res) => {
  const token = getBearerToken(req.headers.authorization);

  try {
    await services.auth.logout(token);

    return res.status(200).json({
      status: res.statusCode,
      message: 'Successfully logged out!',
    });
  } catch (error) {
    if (error.status === 401) {
      return res.status(401).json({
        status: res.statusCode,
        message: 'Unauthorized user please login to proceed',
      });
    }

    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    await services.users.registerNewUser(req.body);

    return res.status(201).json({
      status: res.statusCode,
      message: 'Successfully registered a new account!',
    });
  } catch (error) {
    if (error.status === 422) {
      return joiErrorResponseMaker(res, error.err);
    }

    if (error.err.name === 'ValidationError') {
      return validationErrorResponseMaker(res, error.err);
    }

    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
});

router.get('/verify', tokenMiddleware, async (req, res) => {
  const token = getBearerToken(req.headers.authorization);

  try {
    const decoded = await services.auth.checkToken(token);

    return res.status(200).json({
      status: res.statusCode,
      valid: true,
      message: 'Token still valid',
      payload: decoded,
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
});

module.exports = router;
