const Post = require('../models/Post');
const { validatePost } = require('../validation/post');

/**
 * Get all posts in the posts collection
 *
 * @param {Object} filter
 * @param {string} filter.noComments - Get all the posts without the comments
 * @param {string} filter.sort - most-popular, most-recent
 */
function getAllPosts(filter = null) {
  return new Promise((resolve, reject) => {
    // Get all posts and comments by default
    let query = Post.find({})
      .populate('comments')
      .populate('user', ['active', 'img_url', 'bio', 'username', 'email']);

    // Get all posts without comments
    if (filter.noComments && filter.noComments === '1') {
      query = Post.find({}, { comments: 0 });
    }

    // Get all posts sorted by most likes
    if (filter.sort && filter.sort === 'most-popular') {
      query = query.sort({ likes: -1 });
    }

    // Get all posts sorted by the most recent post
    if (filter.sort && filter.sort === 'most-recent') {
      query = query.sort({ createdAt: -1 });
    }

    return query.exec((err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

/**
 * Get 1 post from the posts collection
 * populated with comments
 *
 * @param {string} id - Post's id
 */
function getSinglePost(id) {
  return new Promise((resolve, reject) => {
    Post.findById(id)
      .populate('comments')
      .populate('user', ['active', 'img_url', 'bio', 'username', 'email'])
      .exec((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
}

/**
 * Searches a post with the given search query
 *
 * @param {string} query - Search query
 */
function searchPost(query) {
  const search = new RegExp(query, 'i');

  return new Promise((resolve, reject) => {
    Post.find({ body: search })
      .populate('comments')
      .populate('user', ['active', 'img_url', 'bio', 'username', 'email'])
      .exec((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
}

/**
 * Creates a new post
 *
 * @param {Object} payload - Data
 * @param {string} payload.user - User's id
 * @param {string} payload.body - The post's content
 */
function createPost(payload) {
  return new Promise((resolve, reject) => {
    const validation = validatePost({ body: payload.body });

    if (validation.error) {
      return reject({ err: validation.error, status: 422 });
    }

    const post = new Post({
      user: payload.user,
      body: payload.body,
    });

    post.save((err, product) => {
      if (err) return reject(err);
      return resolve(product);
    });
  });
}

/**
 * Updates an existing post with the given id
 *
 * @param {string} id - Post's Id
 * @param {Object} payload
 * @param {string} payload.body
 */
function updatePost(id, payload) {
  return new Promise((resolve, reject) => {
    const validation = validatePost(payload);

    if (validation.error) {
      return reject({ err: validation.error, status: 422 });
    }

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

/**
 * Deletes a post with the given post id
 *
 * @param {string} id - Post's Id
 */
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
