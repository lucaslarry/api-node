const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200,
    match: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s'".,!?-]+$/, 
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
    match: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 
  },
  categories: [{
    type: String,
    required: true,
  }],
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel', 
    default: null, 
  },
  isAvailable: {
    type: Boolean,
    default: true, 
  },
});

module.exports = mongoose.model('Book', bookSchema);