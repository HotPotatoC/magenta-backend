const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Cannot be blank'],
      index: true,
    },
    author: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', schema);
