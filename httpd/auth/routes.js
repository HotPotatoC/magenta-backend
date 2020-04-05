require('module-alias/register');

const router = require('express').Router();
const handler = require('@httpd/auth/handler');

router.post('/login', handler.loginHandler);
router.post('/register', handler.registerHandler);
router.get('/checktoken', handler.checkToken);

module.exports = router;
