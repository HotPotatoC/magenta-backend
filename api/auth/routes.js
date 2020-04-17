require('module-alias/register');

const router = require('express').Router();
const handler = require('@api/auth/handler');
const tokenMiddleware = require('@middlewares/tokenMiddleware');

router.post('/login', handler.loginHandler);
router.post('/logout', tokenMiddleware, handler.logoutHandler);
router.post('/register', handler.registerHandler);
router.get('/verify', tokenMiddleware, handler.checkToken);

module.exports = router;
