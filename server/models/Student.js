const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Import bcrypt

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  organizations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Org',
  }],
  registeredEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
  password: {
    type: String,
    required: true,
  },
  major: String,
  graduationYear: Number,
  linkedin: String,
  imageUrl: String,
  isVerified: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Student', StudentSchema);
