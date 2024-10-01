const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../models/Student'); // Adjust paths as needed
const Org = require('../models/Org');
const router = express.Router();

// Student registration
router.post('/register/student', async (req, res) => {
  const { name, year, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ name, year, email, password: hashedPassword });
    await student.save();
    res.status(201).send('Student registered successfully');
  } catch (err) {
    res.status(500).send('Error registering student');
  }
});

// Organization registration
router.post('/register/org', async (req, res) => {
  const { name, orgType, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const org = new Org({ name, orgType, email, password: hashedPassword });
    await org.save();
    res.status(201).send('Organization registered successfully');
  } catch (err) {
    res.status(500).send('Error registering organization');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password, type } = req.body; // 'type' can be 'student' or 'org'
  try {
    let user;
    if (type === 'student') {
      user = await Student.findOne({ email });
    } else if (type === 'org') {
      user = await Org.findOne({ email });
    }

    if (!user) {
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Successful login
    res.status(200).send(`${type} logged in successfully`);
  } catch (err) {
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
