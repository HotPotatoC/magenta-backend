const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const saltWorkFactor = 10;

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Cannot be blank'],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      min: 6,
      max: 25,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Cannot be blank'],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Cannot be blank'],
      min: 6,
      max: 1024,
    },
    img_url: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

schema.plugin(uniqueValidator, {
  message: 'Is already taken.',
});

schema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(saltWorkFactor, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (_err, hash) => {
      if (_err) return next(_err);

      this.password = hash;
      return next();
    });

    return null;
  });

  return null;
});

schema.statics.comparePassword = function (string, hash, callback) {
  bcrypt.compare(string, hash, (err, same) => {
    if (err) return callback(err);

    return callback(null, same);
  });
};

module.exports = mongoose.model('User', schema);
