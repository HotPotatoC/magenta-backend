const Comment = require('../models/Comment');
const Post = require('../models/Post');

/**
 * Get all comment documents with the given
 * post id
 *
 * @param {string} postId
 */
function getCommentsByPostId(postId) {
  return new Promise((resolve, reject) => {
    Comment.find({ post_id: postId }, (err, docs) => {
      if (err) return reject({ err, status: 404 });
      return resolve(docs);
    });
  });
}

/**
 * Creates a new comment document and
 * add the comment id into the post
 *
 * @param {Object} payload
 * @param {string} payload.user_id
 * @param {string} payload.post_id
 * @param {string} payload.body
 */
function createComment(payload) {
  // Create a new comment document instance
  const comment = new Comment({
    user_id: payload.user_id,
    post_id: payload.post_id,
    body: payload.body,
  });

  return new Promise((resolve, reject) => {
    // Save the comment
    comment.save((err, product) => {
      if (err) {
        reject(err);
      } else {
        // Push the comment id into the post document
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
