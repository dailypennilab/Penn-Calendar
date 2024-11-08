// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5038/events');
        
        const sortedEvents = response.data.data.sort((a, b) => 
          new Date(a.time) - new Date(b.time)
        );
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  });

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

return (
  <Box sx={{ backgroundColor: '#dbabad' }}>
    <Box sx={{ padding: '20px' }}>
      {/* Header Section */}
      <Grid container justifyContent="center" alignItems="center">
        <Grid item textAlign="center">
          <Typography variant="h4">Welcome</Typography>
          <Typography variant="subtitle1">How is your day today?</Typography>
        </Grid>
      </Grid>

      {/* Upcoming Events Section */}
      <Typography variant="h5" sx={{ marginTop: '30px', marginBottom: '10px' }}>Upcoming Events</Typography>

      {/* Event Cards */}
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

                  {/* View Event Link */}
                  <Link to={`/events/${event._id}`}>
                    <Button variant="contained" color="primary" sx={{ marginTop: '10px' }}>
                      View Event
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No events available</Typography>
        )}
      </Grid>
    </Box>
  </Box>
);
};

export default Home;