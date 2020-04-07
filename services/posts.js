require('module-alias/register');

const { objectIsEmpty } = require('@utils');
const Post = require('../models/Post');

function getAllPosts(filter = null) {
  if (objectIsEmpty(filter)) {
    return new Promise((resolve, reject) => {
      Post.find({})
        .populate('comments')
        .exec((err, res) => {
          if (err) return reject(err);
          return resolve(res);
        });
    });
  }

  if (filter.sortBy && filter.sortBy === 'most-popular') {
    return new Promise((resolve, reject) => {
      Post.find({})
        .populate('comments')
        .sort({ likes: -1 })
        .exec((err, res) => {
          if (err) return reject(err);
          return resolve(res);
        });
    });
  }

  if (filter.sortBy && filter.sortBy === 'most-recent') {
    return new Promise((resolve, reject) => {
      Post.find({})
        .populate('comments')
        .sort({ createdAt: -1 })
        .exec((err, res) => {
          if (err) return reject(err);
          return resolve(res);
        });
    });
  }
}

function getSinglePost(id) {
  return new Promise((resolve, reject) => {
    Post.findById(id)
      .populate('comments')
      .exec((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
}

function searchPost(query) {
  const search = new RegExp(query, 'i');

  return new Promise((resolve, reject) => {
    Post.find({ body: search })
      .populate('comments')
      .exec((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
}

function createPost(payload) {
  const post = new Post({
    user_id: payload.user_id,
    body: payload.body,
  });

  return new Promise((resolve, reject) => {
    post.save((err, product) => {
      if (err) return reject(err);
      return resolve(product);
    });
  });
}

function updatePost(id, payload) {
  return new Promise((resolve, reject) => {
    Post.findOneAndUpdate(
      { _id: id },
      { body: payload.body },
      { upsert: true }
    ).exec((err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
}

function deletePost(id) {
  return new Promise((resolve, reject) => {
    Post.deleteOne({ _id: id }).exec((err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
}

module.exports = {
  getAllPosts,
  getSinglePost,
  searchPost,
  createPost,
  updatePost,
  deletePost,
};
