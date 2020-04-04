const Joi = require('joi');
const User = require('../models/User');

const projection = {
  _id: 0,
  __v: 0,
  password: 0,
};

const getUsers = (callback) => {
  User.find({}, projection, (err, docs) => {
    if (err) return callback(err, null);
    return callback(null, docs);
  });
};

const getUserByUsername = (username, callback) => {
  User.findOne({ username }, projection, (err, doc) => {
    if (err) return callback(err, null);
    return callback(null, doc);
  });
};

const registerNewUser = (payload, callback) => {
  const validation = Joi.validate(payload, User.validationSchema);

  if (validation.error) {
    return callback(validation.error, null);
  }

  const user = new User({
    username: payload.username,
    email: payload.email,
    password: payload.password,
    img_url: payload.img_url || '',
  });

  return user.save((err, product) => {
    if (err) return callback(err, null);
    return callback(null, product);
  });
};

const updateUserByUsername = (username, payload, callback) => {
  const query = User.findOneAndUpdate(
    { username },
    { username: payload.username },
    { upsert: true }
  );

  query.exec((err, result) => {
    if (err) return callback(err, null);
    return callback(null, result);
  });
};

const deleteUserByUsername = (username, callback) => {
  const query = User.deleteOne({ username });

  query.exec((err, result) => {
    if (err) return callback(err, null);
    return callback(null, result);
  });
};

module.exports = {
  getUsers,
  getUserByUsername,
  registerNewUser,
  updateUserByUsername,
  deleteUserByUsername,
};
