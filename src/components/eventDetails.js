import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';

const EventDetails = () => {
  const { eventId } = useParams(); // Extract the eventId from the URL
  const [event, setEvent] = useState(null);

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
            <Button variant="contained" color="secondary">
              Register Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventDetails;