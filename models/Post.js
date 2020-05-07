const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: [true, 'Cannot be blank'],
    },
    body: {
      type: String,
      required: [true, 'Cannot be blank'],
      max: 500,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', schema);
