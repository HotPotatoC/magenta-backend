require('module-alias/register');

const router = require('express').Router();
const tokenMiddleware = require('@middlewares/tokenMiddleware');
const postHandler = require('@api/posts/postHandler');
const commentHandler = require('@api/posts/commentHandler');

router.get('/', postHandler.getPostsHandler);
router.get('/search', postHandler.searchPostHandler);
router.get('/:id', postHandler.getSinglePostHandler);
router.post('/', tokenMiddleware, postHandler.createPostHandler);
router.put('/:id', tokenMiddleware, postHandler.updatePostHandler);
router.delete('/:id', tokenMiddleware, postHandler.deletePostHandler);

// Comments
router.get(
  '/:id/comments',
  tokenMiddleware,
  commentHandler.getCommentsByPostHandler
);
router.post(
  '/:id/comments',
  tokenMiddleware,
  commentHandler.createCommentHandler
);

module.exports = router;
