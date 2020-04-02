const services = require('../../services');

const getPostsHandler = (req, res) => {
  services.posts.getAllPosts((err, docs) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        status: res.statusCode,
        message: 'There was a problem on our side.',
      });
      return;
    }

    res.status(200).json({
      docs,
    });
  });
};

const getSinglePostHandler = (req, res) => {
  const postId = req.params.id;

  services.posts.getSinglePost(postId, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        status: res.statusCode,
        message: 'There was a problem on our side.',
      });
      return;
    }

    res.status(200).json(docs);
  });
};

const createPostHandler = (req, res) => {
  const payload = {
    user_id: req.session.user._id,
    ...req.body,
  };

  services.posts.createPost(payload, (err) => {
    if (err) {
      res.status(400).json({
        status: res.statusCode,
        message: err.message,
      });
      return;
    }

    res.status(201).json({
      message: 'Successfully inserted a new post to the collection',
    });
  });
};

const updatePostHandler = (req, res) => {
  const postId = req.params.id;
  const payload = req.body;

  services.posts.updatePost(postId, payload, (err) => {
    if (err) {
      res.status(400).json({
        status: res.statusCode,
        message: err.message,
      });
      return;
    }

    res.status(200).json({
      message: 'Successfully updated post',
    });
  });
};

const deletePostHandler = (req, res) => {
  const postId = req.params.id;

  services.posts.deletePost(postId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        status: res.statusCode,
        message: 'There was a problem on our side.',
      });
      return;
    }

    res.status(200).json({
      msg: `Successfully deleted ${result.deletedCount} data`,
    });
  });
};

module.exports = {
  getPostsHandler,
  getSinglePostHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
};
