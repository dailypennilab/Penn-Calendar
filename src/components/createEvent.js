import React, { useState } from 'react';
import { TextField, Button, Typography, Container, MenuItem, InputLabel, FormControl, Select, Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const EventRegistrationForm = () => {
  const { user } = useAuth();

  const [eventData, setEventData] = useState({
    name: '',
    organizer: user.id,
    type: '',
    location: '',
    time: '',
    description: '',
    qualifications: '',
    registrationForm: '',
    imageUrl: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5038/events', eventData);
      setMessage(`Event "${response.data.data.name}" created successfully for user ${user.name}!`);
    } catch (error) {
      setMessage('Error creating event. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: '#dbabad', padding: '30px', borderRadius: '10px', marginTop: '40px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Create New Event
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        {/* Event Name */}
        <TextField
          label="Event Name"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
        />

        {/* Event Type */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            name="type"
            value={eventData.type}
            onChange={handleChange}
            sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
          >
            <MenuItem value="Workshop">Workshop</MenuItem>
            <MenuItem value="Seminar">Seminar</MenuItem>
            <MenuItem value="Conference">Conference</MenuItem>
            <MenuItem value="Meetup">Meetup</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        {/* Location */}
        <TextField
          label="Location"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
        />

        {/* Time */}
        <TextField
          label="Time"
          name="time"
          type="datetime-local"
          value={eventData.time}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
        />

        {/* Description */}
        <TextField
          label="Description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
        />

        {/* Image URL */}
        <TextField
          label="Image URL"
          name="imageUrl"
          value={eventData.imageUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="URL to an image for the event."
          sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#a9a9a9',
            color: '#000000',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#888888' },
            borderRadius: '20px',
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: '16px',
            mb: 2,
          }}
        >
          Submit
        </Button>
      </form>

      {/* Message */}
      {message && (
        <Typography variant="body1" color="textSecondary" sx={{ marginTop: '20px' }}>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default EventRegistrationForm;

