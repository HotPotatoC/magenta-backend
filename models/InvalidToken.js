const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: [true, 'Cannot be blank'],
  },
  token: {
    type: String,
    required: [true, 'Cannot be blank'],
  },
});

module.exports = mongoose.model('invalidtoken', schema);
