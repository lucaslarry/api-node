const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    match: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProfileModel',
  },
  borrowedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserModel', userSchema);