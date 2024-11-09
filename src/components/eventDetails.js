// src/components/EventDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../context/authContext';

const EventDetails = () => {
  const { eventId } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [registrationMessage, setRegistrationMessage] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5038/events/${eventId}`);
        setEvent(response.data.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleRegister = async () => {
    if (!user || !user.id) {
      setRegistrationMessage('Log in to register');
      return;
    }

    if (user.type === 'org') {
      setRegistrationMessage('Organization cannot register for event');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5038/students/${user.id}/events/${eventId}/register`);
      setRegistrationMessage(
        response.data.success
          ? response.data.alreadyRegistered
            ? 'Already registered for event'
            : `Successfully registered for ${event.name}`
          : 'Error during registration.'
      );
    } catch (error) {
      setRegistrationMessage('Error during registration. Please try again.');
    }
  };

  if (!event) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  return (
    <Container>
      <EventImage src={event.imageUrl || '/default-image.jpg'} alt={event.name} />
      <ContentWrapper>
        <LeftColumn>
          <DateText>{new Date(event.time).toLocaleString()}</DateText>
          <Title>{event.name}</Title>
          <Subtitle>{event.organizer} - {event.type || "General"}</Subtitle>
          <Description>{event.description}</Description>
        </LeftColumn>
        <RightColumn>
          <StyledButton maroon onClick={handleRegister}>Register Now</StyledButton>
          <StyledButton>Invite Friends</StyledButton>
          {registrationMessage && <Message>{registrationMessage}</Message>}
        </RightColumn>
      </ContentWrapper>
    </Container>
  );
};

export default EventDetails;

// Styled Components
const Container = styled.div`
  padding: 3rem 7rem;
  color: white;
`;

const EventImage = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: cover;
  object-position: center;
  border-radius: 2rem;
  margin-bottom: 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const LeftColumn = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DateText = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  margin: 0.1rem 0;
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  color: #ccc;
  margin: 0.1rem 0;
`;

const Description = styled.p`
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.6;
  margin-top: 1rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: ${({ maroon }) => (maroon ? '#800000' : '#000000')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: ${({ maroon }) => (maroon ? '#a00000' : '#333333')};
  }
`;

const Message = styled.p`
  color: #4caf50;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #555;
`;
