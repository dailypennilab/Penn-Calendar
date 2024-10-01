const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // Import authentication routes

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// MongoDB connection
const CONNECTION_STRING = "mongodb+srv://ilabmanager:n7VkZ0SoHEjmQlBw@penncalendar.rjlgg.mongodb.net/?retryWrites=true&w=majority&appName=PennCalendar";
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Test route for MongoDB connection
app.get('/', (req, res) => {
  res.send('MongoDB connection test');
});

// Import authentication routes
app.use(authRoutes); // All authentication routes (register, login) handled in separate file

// Start the server
app.listen(5038, () => {
  console.log('Server running on http://localhost:5038');
});
