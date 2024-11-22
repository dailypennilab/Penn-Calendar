import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { TextField, Button, Typography, Grid, Card, CardContent, Link } from '@mui/material';
import styled from 'styled-components';
import StudentCard from '../components/studentCard'; // Assuming StudentCard is in this directory

const Profile = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [profileData, setProfileData] = useState({
    name: '',
    major: '',
    graduationYear: '',
    linkedin: '',
    imageUrl: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile and events
  useEffect(() => {
    const fetchProfileAndEvents = async () => {
      try {
        const [profileResponse, eventsResponse] = await Promise.all([
          axios.get(`http://localhost:5038/students/${user.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
          axios.get(`http://localhost:5038/students/${user.id}/events`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
        ]);

        console.log(profileResponse);
        setProfileData(profileResponse.data.data);
        const sortedEvents = eventsResponse.data.data.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime)
        );
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchProfileAndEvents();
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5038/students/${user.id}`,
        profileData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (response.data.success) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile.');
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Welcome, {user?.name || 'User'}!
      </Typography>

      <UpdateProfileSection>
        <ProfileCardWrapper>
          <StudentCard student={profileData} />
        </ProfileCardWrapper>
        <ProfileFormWrapper>
          <Typography variant="h6" gutterBottom>
            Update Profile
          </Typography>
          <StyledTextField
            label="Name"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
            fullWidth
            margin="normal"
          />
          <StyledTextField
            label="Major"
            name="major"
            value={profileData.major}
            onChange={handleProfileChange}
            fullWidth
            margin="normal"
          />
          <StyledTextField
            label="Graduation Year"
            name="graduationYear"
            type="number"
            value={profileData.graduationYear}
            onChange={handleProfileChange}
            fullWidth
            margin="normal"
          />
          <StyledTextField
            label="LinkedIn URL"
            name="linkedin"
            value={profileData.linkedin}
            onChange={handleProfileChange}
            fullWidth
            margin="normal"
          />
          <StyledTextField
            label="Profile Picture URL"
            name="imageUrl"
            value={profileData.imageUrl}
            onChange={handleProfileChange}
            fullWidth
            margin="normal"
          />
          <StyledButton onClick={handleSaveChanges}>Save Changes</StyledButton>
        </ProfileFormWrapper>
      </UpdateProfileSection>

      <Section>
        <Typography variant="h6" gutterBottom>
          Your Events
        </Typography>
        <StyledGrid container spacing={3}>
          {events.length > 0 ? (
            events.map((event) => (
              <StyledGridItem item xs={12} sm={6} md={4} key={event._id}>
                <StyledCard>
                  <EventImage
                    src={event.imageUrl || 'https://via.placeholder.com/300'}
                    alt={event.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {event.name}
                    </Typography>
                    <Typography variant="body2">
                      Event Type: {event.type || 'General'}
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: 8 }}>
                      {event.description}
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: 10 }}>
                      {formatDate(event.startTime)}
                    </Typography>
                    <ButtonContainer>
                      <StyledLink to={`/events/${event._id}`}>
                        <EventButton variant="contained">
                          View Event
                        </EventButton>
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

const UpdateProfileSection = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 2rem;
  background-color: #2f2f2f;
`;

const ProfileCardWrapper = styled.div`
  flex: 1;
`;

const ProfileFormWrapper = styled.div`
  flex: 2;
`;

const StyledTextField = styled(TextField)`
  background-color: white;
  border-radius: 8px;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
  background-color: #4b0000 !important;
  color: white !important;
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

const EventImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const EventButton = styled(Button)`
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

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;
