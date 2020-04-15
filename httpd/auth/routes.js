require('module-alias/register');

const router = require('express').Router();
const handler = require('@httpd/auth/handler');
const tokenMiddleware = require('@middlewares/tokenMiddleware');

router.post('/login', handler.loginHandler);
router.post('/logout', tokenMiddleware, handler.logoutHandler);
router.post('/register', handler.registerHandler);
router.get('/checktoken', tokenMiddleware, handler.checkToken);

module.exports = router;
