const router = require('express').Router();
const tokenMiddleware = require('../../middlewares/tokenMiddleware');
const handler = require('./handler');

router.get('/', tokenMiddleware, handler.getUsersHandler);
router.get('/:username', tokenMiddleware, handler.getOneUserHandler);
router.post('/', tokenMiddleware, handler.registerUserHandler);
router.put('/:username', tokenMiddleware, handler.updateUserHandler);
router.delete('/:username', tokenMiddleware, handler.deleteUserHandler);

module.exports = {
  path: '/users',
  router,
};
