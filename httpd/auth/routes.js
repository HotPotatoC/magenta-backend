const router = require('express').Router();
const handler = require('./handler');

router.post('/login', handler.loginHandler);
router.post('/register', handler.registerHandler);
router.get('/checktoken', handler.checkToken);

module.exports = router;
