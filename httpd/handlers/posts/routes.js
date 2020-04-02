const router = require('express').Router();
const tokenMiddleware = require('../../middlewares/tokenMiddleware');
const handler = require('./handler');

router.get('/', tokenMiddleware, handler.getPostsHandler);
router.get('/:id', tokenMiddleware, handler.getSinglePostHandler);
router.post('/', tokenMiddleware, handler.createPostHandler);
router.put('/:id', tokenMiddleware, handler.updatePostHandler);
router.delete('/:id', tokenMiddleware, handler.deletePostHandler);

module.exports = {
  path: '/posts',
  router,
};
