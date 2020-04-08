require('module-alias/register');

const Post = require('@models/Post');

function getAllPosts(filter = null) {
  return new Promise((resolve, reject) => {
    let query = Post.find({}).populate('comments');

    if (filter.noComments && filter.noComments === '1') {
      query = Post.find({}, { comments: 0 });
    }

    if (filter.sort && filter.sort === 'most-popular') {
      query = query.sort({ likes: -1 });
    }

    if (filter.sort && filter.sort === 'most-recent') {
      query = query.sort({ createdAt: -1 });
    }

    return query.exec((err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
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
