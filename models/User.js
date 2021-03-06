const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: 'member',
    enum: ['admin', 'member'],
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
