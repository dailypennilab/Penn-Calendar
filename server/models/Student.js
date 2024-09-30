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

// Pre-save hook to hash password before saving
StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password field is modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Student', StudentSchema);
