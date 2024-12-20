const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student'); // Adjust paths as needed
const Event = require('../models/Event');
const router = express.Router();

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching students' });
  }
});

// Get student profile
router.get('/students/:studentId', async (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(404).json({ success: false, message: "Invalid Student ID" });
  }

  try {
    const student = await Student.findById(studentId).populate('organizations').populate('registeredEvents');
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({success: true, data: student});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching student profile' });
  }
});

// Update student profile
router.put('/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const student = req.body;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(404).json({ success: false, message: "Invalid Student ID" });
  }

  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, student, { new: true });
    console.log(updatedStudent);

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, data: updatedStudent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Error updating student profile' });
  }
});

// Get events associated with a student
router.get('/students/:studentId/events', async (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(404).json({ success: false, message: "Invalid Student ID" });
  }

  try {
    // const student = await Student.findById(studentId).populate('events');
    const student = await Student.findById(studentId).populate('registeredEvents');

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, data: student.registeredEvents });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching student events' });
  }
});

// Register student for an event
router.post('/students/:studentId/events/:eventId/register', async (req, res) => {
  const { studentId, eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(404).json({ success: false, message: "Invalid Student ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ success: false, message: "Invalid Event ID" });
  }

  try {
    // const student = await Student.findById(studentId).populate('events');
    const student = await Student.findById(studentId);
    const event = await Event.findById(eventId);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const alreadyRegistered = student.registeredEvents.some(
      (event) => event.toString() === eventId
    );

    if (alreadyRegistered) {
      return res.status(200).json({ success: true, alreadyRegistered: true, message: 'Already registered for event' });
    }

    student.registeredEvents.push(event);
    const newStudent = await Student.findByIdAndUpdate(studentId, student, { new: true });

    res.status(200).json({ success: true, data: newStudent });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error registering for the event' });
  }
});

// Unregister student from an event
router.delete('/students/:studentId/events/:eventId', async (req, res) => {
  const { studentId, eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(404).json({ success: false, message: "Invalid Student ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ success: false, message: "Invalid Event ID" });
  }

  try {
    const student = await Student.findById(studentId);
    const event = await Event.findById(eventId);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Remove event from student's events
    student.registeredEvents = student.registeredEvents.filter(e => e.equals(event));
    const newStudent = await Student.findByIdAndUpdate(studentId, student, { new: true });

    res.status(200).json({ success: true, data: newStudent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Error unregistering from the event' });
  }
});

module.exports = router;
