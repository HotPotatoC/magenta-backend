const router = require('express').Router();
const tokenMiddleware = require('../../middlewares/tokenMiddleware');
const services = require('../../services');

const { joiErrorResponseMaker } = require('../helpers');

router.get('/', async (req, res) => {
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
});

router.get('/search', async (req, res) => {
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
});

router.get('/:id', async (req, res) => {
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
});

router.post('/', tokenMiddleware, async (req, res) => {
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
    if (error.status === 422) {
      return joiErrorResponseMaker(res, error.err);
    }

    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
});

router.put('/:id', tokenMiddleware, async (req, res) => {
  const postId = req.params.id;
  const payload = req.body;

  try {
    await services.posts.updatePost(postId, payload);

    return res.status(200).json({
      status: res.statusCode,
      message: 'Successfully updated post',
    });
  } catch (error) {
    if (error.status === 422) {
      return joiErrorResponseMaker(res, error.err);
    }

    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
});

router.delete('/:id', tokenMiddleware, async (req, res) => {
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
});

module.exports = router;
