const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const Org = require('./models/Org'); // Import Org model
const Student = require('./models/Student'); // Import Student model

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB with error handling
mongoose.connect('mongodb://localhost/penn-calendar', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Example route to add a new student
app.post('/students', async (req, res) => {
  const { name, year, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !year || !email || !password) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new student object
    const student = new Student({ 
      name, 
      year, 
      email, 
      password: hashedPassword // Save hashed password
    });
    
    // Save
