require('module-alias/register');

const User = require('@models/User');
const Validate = require('@validation/auth');

const projection = {
  _id: 0,
  __v: 0,
  password: 0,
};

function getUsers(callback) {
  User.find({}, projection, (err, docs) => {
    if (err) return callback(err, null);
    return callback(null, docs);
  });
}

function getUserByUsername(username, callback) {
  User.findOne({ username }, projection, (err, doc) => {
    if (err) return callback(err, null);
    return callback(null, doc);
  });
}

function registerNewUser(payload) {
  return new Promise((resolve, reject) => {
    const validation = Validate.validateRegister(
      payload,
      User.validationSchema
    );

    if (validation.error) {
      return reject(validation.error);
    }

    const user = new User({
      username: payload.username,
      email: payload.email,
      password: payload.password,
      img_url: payload.img_url || '',
    });

    return user.save((err, product) => {
      if (err) return reject(err);
      return resolve(product);
    });
  });
}

function updateUserByUsername(username, payload, callback) {
  const query = User.findOneAndUpdate(
    { username },
    { username: payload.username },
    { upsert: true }
  );

  query.exec((err, result) => {
    if (err) return callback(err, null);
    return callback(null, result);
  });
}

function deleteUserByUsername(username, callback) {
  const query = User.deleteOne({ username });

  query.exec((err, result) => {
    if (err) return callback(err, null);
    return callback(null, result);
  });
}

module.exports = {
  getUsers,
  getUserByUsername,
  registerNewUser,
  updateUserByUsername,
  deleteUserByUsername,
};
