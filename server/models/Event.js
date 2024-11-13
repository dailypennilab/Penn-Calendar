// models/Event.js
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
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  description: String,
  registrationForm: String,
  imageUrl: String,
  featured: Boolean,
  registeredStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
});

module.exports = mongoose.model('Event', EventSchema);
