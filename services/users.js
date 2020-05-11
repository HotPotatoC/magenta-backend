/* eslint-disable no-param-reassign */
const User = require('../models/User');
const Post = require('../models/Post');
const { validateRegister } = require('../validation/auth');

const projection = {
  _id: 0,
  __v: 0,
  password: 0,
};

/**
 * Get all users in the users collection
 */
function getUsers(filter = null) {
  return new Promise((resolve, reject) => {
    let query = User.find({}, projection);

    if (filter && filter.verbose === '1') {
      query = query.populate({
        path: 'posts',
        populate: {
          path: 'comments',
        },
        select: ['likes', 'body', 'createdAt', 'updatedAt'],
        options: {
          sort: [{ createdAt: -1 }],
        },
      });
    }

    query.exec((err, docs) => {
      if (err) return reject({ err, status: 500 });
      return resolve(docs);
    });
  });
}

/**
 * Get 1 user with the given username
 *
 * @param {string} username - User's username
 */
function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, projection, (err, doc) => {
      if (err) return reject({ err, status: 500 });
      if (!doc) return reject({ status: 404 });
      return resolve(doc);
    });
  });
}

/**
 * Get user's posts
 *
 * @param {string} username - User's username
 */
function getUserPosts(username) {
  return new Promise((resolve, reject) => {
    User.findOne({ username }).exec((err, user) => {
      if (err) return reject({ err, status: 500 });
      if (!user) return reject({ status: 404 });

      const query = Post.find({ user: user._id })
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: ['active', 'img_url', 'bio', 'username', 'email'],
          },
        })
        .populate('user', ['active', 'img_url', 'bio', 'username', 'email']);

      query.exec((_err, doc) => {
        if (_err) return reject({ err: _err, status: 500 });
        return resolve(doc);
      });
    });
  });
}

/**
 * Get user's posts
 *
 * @param {string} username - User's username
 * @param {string} postId - Post's id
 */
function getUserPostById(username, postId) {
  return new Promise((resolve, reject) => {
    User.findOne({ username }).exec((err, user) => {
      if (err) return reject({ err, status: 500 });
      if (!user) return reject({ collection: 'user', status: 404 });

      const query = Post.findOne({
        _id: postId,
        user: user._id,
      })
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: ['active', 'img_url', 'bio', 'username', 'email'],
          },
        })
        .populate('user', ['active', 'img_url', 'bio', 'username', 'email']);

      query.exec((_err, doc) => {
        if (_err || !doc) return reject({ collection: 'post', status: 404 });
        return resolve(doc);
      });
    });
  });
}

/**
 * Registers a new user
 *
 * @param {Object} payload - New user payload
 * @param {string} payload.username
 * @param {string} payload.email
 * @param {string} payload.password
 * @param {string} payload.img_url
 * @param {string} payload.bio
 */
function registerNewUser(payload) {
  return new Promise((resolve, reject) => {
    // Validates the payload data
    const validation = validateRegister(payload);

    if (validation.error) {
      // If validation fails, stop the operation and return a 422 error
      return reject({ err: validation.error, status: 422 });
    }

    // Create a new user document instance
    const user = new User({
      username: payload.username,
      email: payload.email,
      password: payload.password,
      img_url: payload.img_url || '',
      bio: payload.bio || '',
    });

    // saves the new user
    return user.save((err, product) => {
      if (err) return reject({ err, status: 500 });
      return resolve(product);
    });
  });
}

/**
 * Updates a new user with the given username
 *
 * @param {string} username
 * @param {Object} payload
 * @param {string} payload.username
 */
function updateUserByUsername(username, payload) {
  return new Promise((resolve, reject) => {
    // Finds the existing user
    const query = User.findOne({ username });

    query.exec((err, user) => {
      if (err) return reject({ err, status: 500 });

      // If the user with the given username does not exists,
      // stop the operation and return a 404 error
      if (!user) return reject({ err, status: 404 });

      // Update the user
      user.username = payload.username;
      user.save();

      return resolve(user);
    });
  });
}

/**
 * Deletes an existing user with the given username
 *
 * @param {string} username
 */
function deleteUserByUsername(username) {
  return new Promise((resolve, reject) => {
    // Delete user query
    const query = User.deleteOne({ username });

    query.orFail((err) => {
      // If delete fails, stop the operation and return a 404 error
      return reject({ err, status: 404 });
    });

    query.exec((err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
}

module.exports = {
  getUsers,
  getUserByUsername,
  getUserPosts,
  getUserPostById,
  registerNewUser,
  updateUserByUsername,
  deleteUserByUsername,
};
