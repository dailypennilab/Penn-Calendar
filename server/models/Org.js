const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Import bcrypt

const OrgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  orgType: {
    type: String,
    enum: ['student_org', 'company'],
    required: true,
  },
  typeOfOrg: String,
  email: {
    type: String,
    required: true,
  },
  description: String,
  logo: String,
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
  password: {
    type: String,
    required: true,
  }
});

// Pre-save hook to hash password before saving
OrgSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password field is modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Org', OrgSchema);
