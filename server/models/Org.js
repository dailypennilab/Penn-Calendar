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

module.exports = mongoose.model('Org', OrgSchema);
