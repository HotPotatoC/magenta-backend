require('module-alias/register');

const Comment = require('@models/Comment');
const Post = require('@models/Post');

function getCommentsByPostId(postId) {
  return new Promise((resolve, reject) => {
    Comment.find({ post_id: postId }, (err, docs) => {
      if (err) return reject(err);
      return resolve(docs);
    });
  });
}

function createComment(payload) {
  const comment = new Comment({
    user_id: payload.user_id,
    post_id: payload.post_id,
    body: payload.body,
  });

  return new Promise((resolve, reject) => {
    comment.save((err, product) => {
      if (err) {
        reject(err);
      } else {
        Post.update(
          { _id: payload.post_id },
          { $push: { comments: product } },
          (_err) => {
            if (_err) return reject(_err);
            return resolve(product);
          }
        );
      }
    });
  });
}

module.exports = {
  getCommentsByPostId,
  createComment,
};
