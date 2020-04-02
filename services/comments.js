const Comment = require('../models/Comment');
const Post = require('../models/Post');

const getCommentsByPostId = (postId, callback) => {
  Comment.find({ post_id: postId }, (err, docs) => {
    if (err) return callback(err, null);
    return callback(null, docs);
  });
};

const createComment = (payload, callback) => {
  const comment = new Comment({
    user_id: payload.user_id,
    post_id: payload.post_id,
    body: payload.body,
  });

  comment.save((err, product) => {
    if (err) {
      callback(err, null);
    } else {
      Post.update(
        { _id: payload.post_id },
        { $push: { comments: product } },
        (_err) => {
          if (_err) return callback(_err, null);
          return callback(null, product);
        }
      );
    }
  });
};

module.exports = {
  getCommentsByPostId,
  createComment,
};
