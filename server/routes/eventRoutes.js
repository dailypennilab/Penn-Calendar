const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/Event');
const Student = require('../models/Student'); // Assuming you'll be sending invites to registered students
const Org = require('../models/Org');
const router = express.Router();

// Fetch all events (with optional filtering by date, category, etc.)
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching events' });
  }
});

// Fetch details of a specific event
router.get('/events/:eventId', async (req, res) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ success: false, message: "Invalid Event ID" });
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching event' });
  }
});

// Add a new event
router.post('/events', async (req, res) => {
  const event = req.body;
  console.log(event.organizer);

  // might have to do different validation for organizer and time ?
  if (!event.organizer || !event.name || !event.time) {
    return res.status(404).json({ success: false, message: "Please include all required fields" });
  }

  try {
    console.log('in??');
    console.log(JSON.stringify(event));
    const newEvent = new Event(event);
    await newEvent.save();
    console.log(newEvent);
    console.log('saved??');

    const organizer = await Org.findById(newEvent.organizer);
    console.log('org found');
    console.log(organizer);
    if (!organizer) {
      return res.status(404).json({ success: false, message: "Organizer not found" });
    }
    console.log('past not');
    organizer.events.push(newEvent);
    console.log('pushed');
    await organizer.save();
    console.log('saved');

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

    res.status(200).json({ success: true, data: event });
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
