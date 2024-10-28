const express = require('express');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student'); // Adjust paths as needed
const Org = require('../models/Org');
const router = express.Router();

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
    res.status(201).json({ success: true, data: newStudent });
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
    if (login.type === 'student') {
      let email1 = login.email;
      user = await Student.findOne({ email: email1 });
    } else if (login.type === 'org') {
      let email1 = login.email;
      user = await Org.findOne({ email: email1 });
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(login.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Successful login
    res.status(200).json({ success: true, message: `${login.type} logged in successfully`});
  } catch (err) {
    res.status(500).json({ success: false, message: `Error logging in: ${err.message}` });
    console.log(JSON.stringify(err))
  }
});

module.exports = router;
