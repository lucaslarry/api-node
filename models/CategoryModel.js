const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 2,
    maxlength: 50,
    match: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookModel', 
  }],
});

module.exports = mongoose.model('CategoryModel', categorySchema);