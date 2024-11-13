import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { Card, CardContent, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Profile = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const endpoint = user.type === 'org'
        ? `http://localhost:5038/organizations/${user.id}/events`
        : `http://localhost:5038/students/${user.id}/events`;

      try {
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const sortedEvents = response.data.data.sort((a, b) => new Date(a.time) - new Date(b.time));
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    
    if (user) fetchEvents();
  }, [user]);

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Welcome, {user?.name || 'User'}!
      </Typography>

      <Section>
        <Typography variant="h6" gutterBottom>
          Your Events
        </Typography>
        <StyledGrid container spacing={3}>
          {events.length > 0 ? (
            events.map(event => (
              <StyledGridItem item xs={12} sm={6} md={4} key={event._id}>
                <StyledCard>
                  <EventImage src={event.imageUrl || "https://via.placeholder.com/300"} alt={event.name} />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {event.name}
                    </Typography>
                    <Typography variant="body2">
                      Event Type: {event.type || "General"}
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: 8 }}>
                      {event.description}
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: 10 }}>
                      {formatDate(event.time)}
                    </Typography>
                    <ButtonContainer>
                      <StyledLink to={`/events/${event._id}`}>
                        <StyledButton variant="contained">
                          View Event
                        </StyledButton>
                      </StyledLink>
                    </ButtonContainer>
                  </CardContent>
                </StyledCard>
              </StyledGridItem>
            ))
          ) : (
            <Typography variant="body1">No events available</Typography>
          )}
        </StyledGrid>
      </Section>
    </Container>
  );
};

export default Profile;

// Styled Components

const Container = styled.div`
  padding: 2rem 4rem;
  background-color: #1e1e1e;
  color: white;
  min-height: 100vh;
`;

const Section = styled.div`
  margin-top: 2rem;
`;

const StyledGrid = styled(Grid)`
  justify-content: center;
`;

const StyledGridItem = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  max-width: 350px;
  background-color: #2f2f2f !important;
  color: #fff !important;
  border-radius: 16px !important;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important;
  transition: transform 0.3s ease, background-color 0.3s ease !important;

  &:hover {
    background-color: #4b0000 !important;
    transform: scale(1.02);
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #000 !important;
  color: #fff !important;
  font-weight: 600 !important;
  padding: 0.5rem 0 !important;
  border-radius: 8px !important;
  transition: background-color 0.2s ease !important;

  &:hover {
    background-color: #333 !important;
  }
`;
