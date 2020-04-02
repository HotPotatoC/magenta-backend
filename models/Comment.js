const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: [true, 'Cannot be blank'],
  },
  post_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Post',
    required: [true, 'Cannot be blank'],
  },
  body: {
    type: String,
    required: [true, 'Cannot be blank'],
  },
});

module.exports = mongoose.model('Comment', schema);
