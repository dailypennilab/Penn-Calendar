// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
} from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';

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
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
      <Header>
        <Typography variant="h4">Welcome</Typography>
        <Typography variant="subtitle1">How is your day today?</Typography>
      </Header>

      <SectionTitle variant="h5">Upcoming Events</SectionTitle>

      <EventsGrid>
        {events.length > 0 ? (
          events.map(event => (
            <EventCard key={event._id}>
              <EventImage src={event.imageUrl || "https://via.placeholder.com/300"} alt={event.name} />
              <EventContent>
                <Typography variant="body2" color="textSecondary">
                  Event Type: {event.type || "General"}
                </Typography>
                <EventTitle variant="h6">
                  <StyledLink to={`/events/${event._id}`}>{event.name}</StyledLink>
                </EventTitle>
                <Typography variant="body2">{event.description}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
                  {formatDate(event.time)}
                </Typography>
                <StyledLink to={`/events/${event._id}`}>
                  <ViewButton variant="contained" color="primary">View Event</ViewButton>
                </StyledLink>
              </EventContent>
            </EventCard>
          ))
        ) : (
          <Typography>No events available</Typography>
        )}
      </EventsGrid>
    </Container>
  );
};

export default Home;

// Styled Components
const Container = styled.div`
  background-color: #dbabad;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SectionTitle = styled(Typography)`
  margin-top: 30px;
  margin-bottom: 10px;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
`;

const EventImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const EventContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EventTitle = styled(Typography)`
  margin-top: 8px;
  text-decoration: none;
  color: inherit;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ViewButton = styled(Button)`
  margin-top: 10px;
`;

