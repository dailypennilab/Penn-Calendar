const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const Org = require('./models/Org'); // Import Org model
const Student = require('./models/Student'); // Import Student model

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

const CONNECTION_STRING = "mongodb+srv://ilabmanager:n7VkZ0SoHEjmQlBw@penncalendar.rjlgg.mongodb.net/?retryWrites=true&w=majority&appName=PennCalendar";
const DATABASE_NAME = "calendardb";

// Connect to MongoDB with error handling
mongoose.connect(CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('mongodb connection test');
});

app.listen(5038, () => {
  console.log('server running on port 5038');
});

// Sample route to add a student
app.post('/add-student', async (req, res) => {
  try {
    const { name, year, email, password } = req.body; // Get student info from request body

    // Create a new student object
    const newStudent = new Student({
      name: name,
      year: year,
      email: email,
      password: password, // This will be hashed in the StudentSchema pre-save hook
      organizations: [],  // No organizations for now
      registeredEvents: [] // No events registered yet
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();
    res.status(201).json({
      message: 'Student added successfully',
      student: savedStudent
    });
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).json({ error: 'Failed to add student' });
  }
});