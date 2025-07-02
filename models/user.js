const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User'
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);
