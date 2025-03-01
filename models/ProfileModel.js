const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
    unique: true, 
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500, 
  },
  profilePicture: {
    type: String,
    trim: true,
    default: 'default-profile.jpg',
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('ProfileModel', profileSchema);