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
  Avatar,
  IconButton,
} from '@mui/material';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
  }, []);

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  // return (
  //   <div>
  //     <h1>Event List</h1>
  //     {events.length > 0 ? (
  //       events.map(event => (
  //         <div key={event._id} style={{ margin: '10px 0' }}>
  //           <h2>{event.name}</h2>
  //           <p>{event.description}</p>
  //           <Link to={`/events/${event._id}`}>
  //             <button>View Event</button>
  //           </Link>
  //         </div>
  //       ))
  //     ) : (
  //       <p>No events available</p>
  //     )}
  //   </div>
  // );

  return (
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
                {/* Replace with event image if available */}
                <img
                  src={event.imageURL || "https://via.placeholder.com/300"}
                  alt={event.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography variant="body2">{event.description}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
                    {formatDate(event.time)}
                  </Typography>
                  {/* Link to event details */}
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
  );
};

export default Home;
