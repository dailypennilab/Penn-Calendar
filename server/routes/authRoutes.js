const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Student = require('../models/Student'); // Adjust paths as needed
const Org = require('../models/Org');
const sendVerificationEmail = require('../utils/emailVerify');
const router = express.Router();

dotenv.config();

// Student registration
router.post('/register/student', async (req, res) => {
  const student = req.body;

  if (!student.name || !student.email || !student.password) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  try {
    student.password = await bcrypt.hash(student.password, 10);
    const newStudent = new Student(student);
    await newStudent.save();

    await sendVerificationEmail(newStudent);

    res.status(201).json({ success: true, data: newStudent, message: "Successful registration. A verification email has been sent." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error registering student" });
  }
});

// Organization registration
router.post('/register/org', async (req, res) => {
  const org = req.body;

  if (!org.name || !org.orgType || !org.email || !org.password) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" })
  }

  try {
    org.password = await bcrypt.hash(org.password, 10);
    const newOrg = new Org(org);
    await newOrg.save();
    res.status(201).json({ success: true, data: newOrg });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error registering organization" });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const login = req.body;

  if (!login.email || !login.password || !login.type) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  try {
    let user;
    let type = login.type;
    let email = login.email;
    let password = login.password;

    if (login.type === 'student') {
      user = await Student.findOne({ email: email });
    } else if (login.type === 'org') {
      user = await Org.findOne({ email: email });
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ success: false, message: 'Please verify your email before logging in' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, type, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ success: true, token: token, user: { id: user._id, name: user.name, type: type }, message: `Logged in successfully`});
  } catch (err) {
    res.status(500).json({ success: false, message: `Error logging in: ${err.message}` });
    console.log(JSON.stringify(err))
  }
});

router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ success: false, message: 'Invalid or missing token.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user
    const user = await Student.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'Email already verified.' });
    }

    // Update user status
    user.isVerified = true;
    await user.save();

    res.status(200).json({ success: true, message: 'Email verified successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Verification failed.' });
  }
});

module.exports = router;
