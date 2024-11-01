import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const EventRegistrationForm = () => {
  const { user } = useAuth();

  const [eventData, setEventData] = useState({
    name: '',
    organizer: user.id,
    time: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   const fetchOrganizers = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5038/organizations');
  //       setOrganizers(response.data.data);
  //     }
  //     catch (error) {
  //       console.error(`Error fetching organizers: ${error}`);
  //     }
  //   };
  //   fetchOrganizers();
  // }, []);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleOrganizerChange = (e) => {
  //   // const selectedOrganizer = organizers.find(org => org._id === e.target.value);
  //   setEventData({
  //     ...eventData,
  //     // organizer: selectedOrganizer,
  //     organizer: e.target.value,
  //   });
  // };

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
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Register a New Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Name"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        
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
        />
        
        <TextField
          label="Description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      {message && <Typography variant="body1" color="textSecondary">{message}</Typography>}
    </Container>
  );
};

export default EventRegistrationForm;
