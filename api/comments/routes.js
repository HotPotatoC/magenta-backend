const router = require('express').Router();
const tokenMiddleware = require('../../middlewares/tokenMiddleware');
const services = require('../../services');

router.get('/:id/comments', tokenMiddleware, async (req, res) => {
  const postId = req.params.id;

  try {
    const comments = await services.comments.getCommentsByPostId(postId);

    return res.status(200).json({
      status: res.statusCode,
      comments,
    });
  } catch (error) {
    return res.status(404).json({
      status: res.statusCode,
      message: 'No comments in post',
    });
  }
});

router.post('/:id/comments', tokenMiddleware, async (req, res) => {
  const payload = {
    user_id: req.session.user._id,
    post_id: req.params.id,
    body: req.body.body,
  };

  try {
    await services.comments.createComment(payload);

    return res.status(201).json({
      status: res.statusCode,
      message: `Successfully added a new comment to the post id(${req.params.id})`,
    });
  } catch (error) {
    return res.status(400).json({
      status: res.statusCode,
      message: error.message,
    });
  }
});

module.exports = router;
