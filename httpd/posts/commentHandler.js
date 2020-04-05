require('module-alias/register');

const services = require('@services');

async function getCommentsByPostHandler(req, res) {
  const postId = req.params.id;

  try {
    const comments = await services.comments.getCommentsByPostId(postId);

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
}

async function createCommentHandler(req, res) {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const { userId } = await services.auth.checkToken(token);

    const payload = {
      user_id: userId,
      post_id: req.params.id,
      body: req.body.body,
    };

    await services.comments.createComment(payload);

    return res.status(201).json({
      message: `Successfully added a new comment to the post id(${req.params.id})`,
    });
  } catch (error) {
    return res.status(400).json({
      status: res.statusCode,
      message: error.message,
    });
  }
}

module.exports = {
  getCommentsByPostHandler,
  createCommentHandler,
};
