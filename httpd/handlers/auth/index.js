const router = require('express').Router();
const config = require('../../../config');
const services = require('../../../services');

/* eslint-disable consistent-return */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  services.auth
    .login(email, password)
    .then(({ token, user, status }) => {
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
});

router.post('/register', (req, res) => {
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
});

module.exports = {
  path: '/auth',
  router,
};
