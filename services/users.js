/* eslint-disable no-param-reassign */
const User = require('../models/User');
const { validateRegister } = require('../validation/auth');

const projection = {
  _id: 0,
  __v: 0,
  password: 0,
};

function getUsers() {
  return new Promise((resolve, reject) => {
    User.find({}, projection, (err, docs) => {
      if (err) return reject({ err, status: 500 });
      return resolve(docs);
    });
  });
}

function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, projection, (err, doc) => {
      if (err) return reject({ err, status: 500 });
      return resolve(doc);
    });
  });
}

function registerNewUser(payload) {
  return new Promise((resolve, reject) => {
    const validation = validateRegister(payload);

    if (validation.error) {
      return reject({ err: validation.error, status: 422 });
    }

    const user = new User({
      username: payload.username,
      email: payload.email,
      password: payload.password,
      img_url: payload.img_url || '',
      bio: payload.bio || '',
    });

    return user.save((err, product) => {
      if (err) return reject({ err, status: 500 });
      return resolve(product);
    });
  });
}

function updateUserByUsername(username, payload) {
  return new Promise((resolve, reject) => {
    const query = User.findOne({ username });

    query.exec((err, user) => {
      if (err) return reject({ err, status: 500 });
      if (!user) return reject({ err, status: 404 });

      user.username = payload.username;
      user.save();

      return resolve(user);
    });
  });
}

function deleteUserByUsername(username) {
  return new Promise((resolve, reject) => {
    const query = User.deleteOne({ username });

    query.orFail((err) => {
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
  registerNewUser,
  updateUserByUsername,
  deleteUserByUsername,
};
