import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { Card, CardContent, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useAuth();
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
      let response = await axios.delete(`http://localhost:5038/students/${user.id}/events/${eventId}`);
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
    <div>
      <h1>Profile</h1>
      <h2>Welcome, {user.name}!</h2>

      <div>
        <h3>Your Events</h3>
        <Grid container spacing={2}>
          {events.length > 0 ? (
            events.map(event => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <Card sx={{ height: '100%' }}>
                  {/* Event Image */}
                  <img
                    src={event.imageUrl || "https://via.placeholder.com/300"}
                    alt={event.name}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <CardContent>
                    {/* Event Type */}
                    <Typography variant="body2" color="textSecondary">
                      Event Type: {event.type || "General"}
                    </Typography>

                    {/* Event Title as a Link */}
                    <Typography variant="h6">
                      <Link to={`/events/${event._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {event.name}
                      </Link>
                    </Typography>

                    {/* Event Description */}
                    <Typography variant="body2">{event.description}</Typography>

                    {/* Event Date and Time */}
                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
                      {formatDate(event.time)}
                    </Typography>

                    <div>
                      <Link to={`/events/${event._id}`}>
                        <Button variant="contained" color="primary" sx={{ marginTop: '10px', marginLeft: '10px' }}>
                          View Event
                        </Button>
                      </Link>

                      {/* Show Delete button only if user is an organizer */}
                      {user.type === 'org' && (
                        <Button variant="contained" color="secondary" sx={{ marginTop: '10px' }} onClick={() => deleteEvent(event._id)}>
                          Delete Event
                        </Button>
                      )}

                      {/* Show Unregister button only if user is a student */}
                      {user.type === 'student' && (
                        <Button variant="contained" color="secondary" sx={{ marginTop: '10px' }} onClick={() => unregisterEvent(event._id)}>
                          Unregister Event
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <h4>No events available</h4>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Profile;