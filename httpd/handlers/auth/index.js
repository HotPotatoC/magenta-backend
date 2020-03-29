const router = require('express').Router();
const handler = require('./handler');

router.post('/login', handler.loginHandler);
router.post('/register', handler.registerHandler);

module.exports = {
  path: '/auth',
  router,
};
