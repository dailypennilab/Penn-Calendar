const express = require('express');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student'); // Adjust paths as needed
const Event = require('../models/Event');
const router = express.Router();

// Get user profile
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const student = await Student.findById(userId).populate('organizations');
    if (!student) {
      return res.status(404).send('User not found');
    }
    res.status(200).json({data: student});
  } catch (err) {
    res.status(500).send('Error fetching user profile');
  }
});

// Update user profile
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, year, email, password } = req.body;
  try {
    let student = await Student.findById(userId);
    if (!student) {
      return res.status(404).send('User not found');
    }

    // Update fields if provided
    if (name) student.name = name;
    if (year) student.year = year;
    if (email) student.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      student.password = hashedPassword;
    }

    await student.save();
    res.status(200).send({message: 'User profile updated successfully', newStudent: student});
  } catch (err) {
    res.status(500).send('Error updating user profile');
  }
});

// Get events associated with a user
router.get('/:userId/events', async (req, res) => {
  const { userId } = req.params;
  try {
    const student = await Student.findById(userId).populate('events');
    if (!student) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(student.events);
  } catch (err) {
    res.status(500).send('Error fetching user events');
  }
});

// Register user for an event
router.post('/:userId/events/:eventId/register', async (req, res) => {
  const { userId, eventId } = req.params;
  try {
    const student = await Student.findById(userId);
    const event = await Event.findById(eventId);
    if (!student || !event) {
      return res.status(404).send('User or event not found');
    }

    student.events.push(event);
    await student.save();

    res.status(200).send('User registered for the event');
  } catch (err) {
    res.status(500).send('Error registering for the event');
  }
});

// Unregister user from an event
router.delete('/:userId/events/:eventId', async (req, res) => {
  const { userId, eventId } = req.params;
  try {
    const student = await Student.findById(userId);
    const event = await Event.findById(eventId);

    if (!student) {
      return res.status(404).send('User not found');
    }

    if (!event) {
      return res.status(404).send('Event not found');
    }

    // Remove event from user's events
    student.events = student.events.filter(e => e.equals(event));
    await student.save();

    res.status(200).send('User unregistered from the event');
  } catch (err) {
    res.status(500).send('Error unregistering from the event');
  }
});

module.exports = router;
