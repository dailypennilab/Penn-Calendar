const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Import bcrypt

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: String,
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
  }
});

module.exports = mongoose.model('Student', StudentSchema);
