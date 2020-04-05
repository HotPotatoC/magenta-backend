require('module-alias/register');

const services = require('@services');

async function getPostsHandler(req, res) {
  try {
    const posts = await services.posts.getAllPosts();

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
}

async function getSinglePostHandler(req, res) {
  const postId = req.params.id;

  try {
    const post = await services.posts.getSinglePost(postId);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
}

async function createPostHandler(req, res) {
  const payload = {
    user_id: req.session.user._id,
    ...req.body,
  };

  try {
    await services.posts.createPost(payload);

    return res.status(201).json({
      message: 'Successfully inserted a new post to the collection',
    });
  } catch (error) {
    return res.status(400).json({
      status: res.statusCode,
      message: error.message,
    });
  }
}

async function updatePostHandler(req, res) {
  const postId = req.params.id;
  const payload = req.body;

  try {
    await services.posts.updatePost(postId, payload);
    return res.status(200).json({
      message: 'Successfully updated post',
    });
  } catch (error) {
    return res.status(400).json({
      status: res.statusCode,
      message: error.message,
    });
  }
}

async function deletePostHandler(req, res) {
  const postId = req.params.id;

  try {
    const { deletedCount } = await services.posts.deletePost(postId);
    return res.status(200).json({
      msg: `Successfully deleted ${deletedCount} data`,
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
}

module.exports = {
  getPostsHandler,
  getSinglePostHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
};
