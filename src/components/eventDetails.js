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
  const [organizerName, setOrganizerName] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [registeredStudents, setRegisteredStudents] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventResponse = await axios.get(`http://localhost:5038/events/${eventId}`);
        setEvent(eventResponse.data.data);

        if (eventResponse.data.data.organizer) {
          const organizerResponse = await axios.get(`http://localhost:5038/organizations/${eventResponse.data.data.organizer}`);
          setOrganizerName(organizerResponse.data.data.name);
        }

        const registrationResponse = await axios.get(`http://localhost:5038/events/${eventId}/registrations`);
        setRegisteredStudents(registrationResponse.data.data);
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

    try {
      const response = await axios.post(`http://localhost:5038/events/${eventId}/register`, {
        studentId: user.id,
      });

      setRegistrationMessage(
        response.data.success
          ? response.data.alreadyRegistered
            ? 'Already registered for event'
            : `Successfully registered for ${event.name}`
          : 'Error during registration.'
      );

      const registrationResponse = await axios.get(`http://localhost:5038/events/${eventId}/registrations`);
      setRegisteredStudents(registrationResponse.data.data);
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationMessage('Error during registration. Please try again.');
    }
  };

  const handleInvite = () => {
    const eventLink = window.location.href;
    navigator.clipboard.writeText(eventLink)
      .then(() => setCopyMessage('Link copied to clipboard!'))
      .catch(() => setCopyMessage('Failed to copy link.'));
    
    setTimeout(() => setCopyMessage(''), 3000);
  };

  if (!event) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  return (
    <Container>
      <EventBox>
        <EventImage src={event.imageUrl || '/default-image.jpg'} alt={event.name} />
        <ContentWrapper>
          <LeftColumn>
            <DateText>{new Date(event.startTime).toLocaleString()}</DateText>
            <Title>{event.name}</Title>
            <Subtitle>{organizerName} - {event.type || "General"}</Subtitle>
            <Description>{event.description}</Description>
          </LeftColumn>
          <RightColumn>
            <StyledButton maroon onClick={handleRegister}>Register Now</StyledButton>
            <StyledButton onClick={handleInvite}>Invite Friends</StyledButton>
            {registrationMessage && <Message>{registrationMessage}</Message>}
            {copyMessage && <CopyMessage>{copyMessage}</CopyMessage>}
          </RightColumn>
        </ContentWrapper>
      </EventBox>

      <RegisteredStudentsSection>
        <RegisteredTitle>Registered Students</RegisteredTitle>
        {registeredStudents.length > 0 ? (
          registeredStudents.map(student => (
            <StudentName key={student.id}>{student.name}</StudentName>
          ))
        ) : (
          <NoStudentsMessage>No students have registered for this event yet.</NoStudentsMessage>
        )}
      </RegisteredStudentsSection>
    </Container>
  );
};

export default EventDetails;

// Styled Components
const Container = styled.div`
  padding: 2rem;
  color: white;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const EventBox = styled.div`
  background-color: #2f2f2f;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    height: 30vh;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
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
  color: #bbb;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  margin: 0.1rem 0;
  color: white;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  color: #ccc;
  margin: 0.1rem 0;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 1rem;
  color: #ddd;
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem 1rem;
  }
`;

const Message = styled.p`
  color: #4caf50;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
`;

const CopyMessage = styled.p`
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

const RegisteredStudentsSection = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #2f2f2f;
  border-radius: 8px;
`;

const RegisteredTitle = styled.h3`
  color: #fff;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StudentName = styled.p`
  color: #ddd;
  font-size: 1rem;
  margin: 0.3rem 0;
`;

const NoStudentsMessage = styled.p`
  color: #ccc;
  font-size: 0.9rem;
`;
