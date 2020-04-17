require('module-alias/register');

const services = require('@services');

async function getPostsHandler(req, res) {
  try {
    const posts = await services.posts.getAllPosts(req.query);

    return res.status(200).json({
      status: res.statusCode,
      posts,
    });
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

    return res.status(200).json({
      status: res.statusCode,
      post,
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
}

async function searchPostHandler(req, res) {
  if (req.query.q) {
    try {
      const post = await services.posts.searchPost(req.query.q);

      if (post.length < 1) {
        return res.status(404).json({
          status: res.statusCode,
          message: `We couldn't find anything for ${req.query.q}`,
        });
      }

      return res.status(200).json({
        status: res.statusCode,
        result: post,
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error,
      });
    }
  } else {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Please provide a search query',
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
      status: res.statusCode,
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
      status: res.statusCode,
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
      status: res.statusCode,
      message: `Successfully deleted ${deletedCount} data`,
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
  searchPostHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
};
