const services = require('../../services');

const getCommentsByPostHandler = (req, res) => {
  const postId = req.params.id;

  services.comments.getCommentsByPostId(postId, (err, docs) => {
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

const createCommentHandler = (req, res) => {
  const token = req.headers.authorization;

  services.auth.checkToken(token, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        msg: 'Login session has expired please login',
        expiredAt: err.expiredAt,
      });
    }

    const payload = {
      user_id: decoded.userId,
      post_id: req.params.id,
      body: req.body.body,
    };

    return services.comments.createComment(payload, (_err) => {
      if (_err) {
        res.status(400).json({
          status: res.statusCode,
          message: _err.message,
        });
        return;
      }

      res.status(201).json({
        message: `Successfully added a new comment to the post id(${req.params.id})`,
      });
    });
  });
};

module.exports = {
  getCommentsByPostHandler,
  createCommentHandler,
};
