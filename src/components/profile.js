import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { Card, CardContent, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (user.type === 'org') {
        try {
          const response = await axios.get(`http://localhost:5038/organizations/${user.id}/events`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          const sortedEvents = response.data.data.sort((a, b) => 
            new Date(a.time) - new Date(b.time)
          );
          setEvents(sortedEvents);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      } else if (user.type === 'student') {
        try {
          const response = await axios.get(`http://localhost:5038/students/${user.id}/events`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          const sortedEvents = response.data.data.sort((a, b) => 
            new Date(a.time) - new Date(b.time)
          );
          setEvents(sortedEvents);
        } catch (error) {
          console.error('Error fetching registered events:', error);
        }
      }
    };
    fetchEvents();
  }, [user.type, user.id]);

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5038/events/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error(`Error deleting event: ${error}`);
    }
  };

  const unregisterEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5038/students/${user.id}/events/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error(`Error unregistering from event: ${error}`);
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography variant="h5" gutterBottom>
        Welcome, {user.name}!
      </Typography>

      <div>
        <Typography variant="h6" gutterBottom>
          Your Events
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {events.length > 0 ? (
            events.map(event => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <Card
                  sx={{
                    maxWidth: '350px',
                    margin: '0 auto',
                    backgroundColor: '#333',
                    color: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                    '&:hover': {
                      backgroundColor: '#8B0000', // Darker red on hover
                    },
                  }}
                >
                  {/* Event Image */}
                  <img
                    src={event.imageUrl || "https://via.placeholder.com/300"}
                    alt={event.name}
                    style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: '10px 10px 0 0' }}
                  />
                  <CardContent sx={{ paddingBottom: '16px' }}>
                    {/* Event Title */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', color: '#fff' }}>
                      {event.name}
                    </Typography>

                    {/* Event Type */}
                    <Typography variant="body2" color="textSecondary">
                      Event Type: {event.type || "General"}
                    </Typography>

                    {/* Event Description */}
                    <Typography variant="body2" color="textSecondary">
                      {event.description}
                    </Typography>

                    {/* Event Date and Time */}
                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
                      {formatDate(event.time)}
                    </Typography>

                    {/* Single Button */}
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                      <Link to={`/events/${event._id}`} style={{ textDecoration: 'none', flexGrow: 1 }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            width: '100%',
                          }}
                        >
                          View Event
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No events available</Typography>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Profile;