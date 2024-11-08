import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { useAuth } from '../context/authContext';

const EventDetails = () => {
  const { eventId } = useParams(); // Extract the eventId from the URL
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [registrationMessage, setRegistrationMessage] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5038/events/${eventId}`);
        setEvent(response.data.data); // assuming response is in the form { success: true, data: {...} }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleRegister = async () => {
    console.log(user);
    if (!user || !user.id) {
      setRegistrationMessage('Log in to register');
      return;
    }

    if (user.type === 'org') {
      setRegistrationMessage('Organization can not register for event');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5038/students/${user.id}/events/${eventId}/register`);

      if (response.data.success) {
        if (response.data.alreadyRegistered) {
          setRegistrationMessage('Already registered for event');
        } else {
          setRegistrationMessage(`Successfully registered for ${event.name}`);
        }
      } else {
        setRegistrationMessage(`Error during registration.`);
      }
    } catch (error) {
      console.log(`Error registering for event: ${error}`);
      setRegistrationMessage(`Error during registration. Please try again.`);
    }
  };

  if (!event) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 600 }}>
        {/* Event Image */}
        <img
          src={event.imageUrl || 'default-image.jpg'}
          alt={event.name}
          style={{ width: '100%', height: 'auto', borderRadius: '4px 4px 0 0' }}
        />

        {/* Event Details */}
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {event.name}
          </Typography>

          <Typography variant="body1" color="textSecondary">
            Organizer: {event.organizer}
          </Typography>

          <Typography variant="body1" color="textSecondary">
            Date and Time: {new Date(event.time).toLocaleString()}
          </Typography>

          <Typography variant="body2" color="textSecondary" paragraph>
            {event.description}
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button variant="contained" color="primary">
              Invite Friends
            </Button>
            <Button variant="contained" color="secondary" onClick={handleRegister}>
              Register Now
            </Button>
          </Box>

          {registrationMessage && (
            <Typography variant="body2" color="success.main" sx={{ marginTop: '10px' }}>
              {registrationMessage}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventDetails;