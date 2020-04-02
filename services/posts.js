const Post = require('../models/Post');
// const Comment = require('../models/Comment');

const getAllPosts = (callback) => {
  Post.find({})
    .populate('comments')
    .exec((err, res) => {
      if (err) return callback(err, null);
      return callback(null, res);
    });
};

const getSinglePost = (id, callback) => {
  Post.findById(id)
    .populate('comments')
    .exec((err, res) => {
      if (err) return callback(err, null);
      return callback(null, res);
    });
};

const createPost = (payload, callback) => {
  const post = new Post({
    user_id: payload.user_id,
    body: payload.body,
  });

  post.save((err, product) => {
    if (err) return callback(err, null);
    return callback(null, product);
  });
};

const updatePost = (id, payload, callback) => {
  const query = Post.findOneAndUpdate(
    { _id: id },
    { body: payload.body },
    { upsert: true }
  );

  query.exec((err, result) => {
    if (err) return callback(err, null);
    return callback(null, result);
  });
};

const deletePost = (id, callback) => {
  const query = Post.deleteOne({ _id: id });

  query.exec((err, result) => {
    if (err) return callback(err, null);
    return callback(null, result);
  });
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
