const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Org',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: String,
  location: String,
  time: {
    type: Date,
    required: true,
  },
  description: String,
  qualifications: String,
  registrationForm: String,
  gcalInvite: String,
});

module.exports = mongoose.model('Event', EventSchema);
