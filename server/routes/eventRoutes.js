// routes/events.js
const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/Event');
const Student = require('../models/Student');
const Org = require('../models/Org');
const router = express.Router();

// Fetch all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({}).populate('organizer');
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching events' });
  }
});

// Fetch all registered students for a specific event
router.get('/events/:eventId/registrations', async (req, res) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ success: false, message: "Invalid Event ID" });
  }

  try {
    // Find the event and populate the registeredStudents field
    const event = await Event.findById(eventId).populate('registeredStudents');
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event.registeredStudents });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching registered students' });
  }
});


// Fetch details of a specific event, including registered students
router.get('/events/:eventId', async (req, res) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ success: false, message: "Invalid Event ID" });
  }

  try {
    const event = await Event.findById(eventId).populate('registeredStudents', 'name'); // Populate with student names
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching event' });
  }
});

// Register a student for an event
router.post('/events/:eventId/register', async (req, res) => {
  const { eventId } = req.params;
  const { studentId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ success: false, message: "Invalid Event or Student ID" });
  }

  try {
    const event = await Event.findById(eventId);
    const student = await Student.findById(studentId);

    if (!event || !student) {
      return res.status(404).json({ success: false, message: 'Event or student not found' });
    }

    // Check if the student is already registered for the event
    if (event.registeredStudents.includes(studentId)) {
      return res.status(400).json({ success: false, message: 'Student is already registered for this event' });
    }

    // Add student to the event's registeredStudents array and the event to the student's registeredEvents array
    event.registeredStudents.push(studentId);
    student.registeredEvents.push(eventId);
    await event.save();
    await student.save();

    res.status(200).json({ success: true, message: 'Student registered successfully', data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error during registration' });
  }
});

// Add a new event
router.post('/events', async (req, res) => {
  const event = req.body;

  if (!event.organizer || !event.name || !event.startTime || !event.endTime) {
    return res.status(404).json({ success: false, message: "Please include all required fields" });
  }

  try {
    const newEvent = new Event(event);
    await newEvent.save();

    const organizer = await Org.findById(newEvent.organizer);

    if (!organizer) {
      return res.status(404).json({ success: false, message: "Organizer not found" });
    }

    organizer.events.push(newEvent);
    await organizer.save();

    res.status(201).json({ success: true, data: newEvent });
  } catch (err) {
    res.status(500).json({ success: false, message: `Error creating event: ${err.message}` });
  }
});

// Update event details
router.put('/events/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const event = req.body;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ success: false, message: "Invalid Event ID" });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, event, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({ success: true, data: updatedEvent });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating event' });
  }
});

// Delete an event
router.delete('/events/:eventId', async (req, res) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ success: false, message: "Invalid Event ID" });
  }

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: deletedEvent });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting event' });
  }
});

module.exports = router;
