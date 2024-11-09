// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5038/events');
        
        const currentTime = new Date();
        const bufferTime = new Date(currentTime.getTime() + 4 * 60 * 60 * 1000); // 4-hour buffer
        
        const filteredEvents = response.data.data
          .filter(event => new Date(event.time) > bufferTime)
          .sort((a, b) => new Date(a.time) - new Date(b.time));
          
        console.log("Filtered Events after date restriction:", filteredEvents); // Log filtered events to check image URLs
        setEvents(filteredEvents);
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
      <Banner>
        <BannerOverlay />
        <BannerContent>
          <Title>Events@Penn</Title>
          <BannerText>
            The Daily Pennsylvanian brings you every major event at Penn with easy ways to view, register, and engage!
            Keep an eye on your favorite organizations, or that next company you want to recruit for.
          </BannerText>
        </BannerContent>
      </Banner>

      <EventsGrid>
        {events.length > 0 ? (
          events.map(event => (
            <EventCard key={event.id}>
              {event.imageUrl && <EventImage src={event.imageUrl} alt={event.name} />}
              <EventContent>
                <EventTitle>{event.name}</EventTitle>
                <EventDetail>Event Type: {event.type || "General"}</EventDetail>
                <EventDetail>{event.description}</EventDetail>
                <EventDate>{formatDate(event.time)}</EventDate>
                <StyledLink to={`/events/${event._id}`}>
                  <ViewButton>View Event</ViewButton>
                </StyledLink>
              </EventContent>
            </EventCard>
          ))
        ) : (
          <NoEventsMessage>No events available</NoEventsMessage>
        )}
      </EventsGrid>
    </Container>
  );
};

export default Home;

// Styled Components
const Container = styled.div`
  padding: 3rem 3rem;
`;

const Banner = styled.div`
  position: relative;
  background-image: url('/banner.jpeg');
  background-size: cover;
  background-position: center;
  height: 250px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
  margin-bottom: 20px;
`;

const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const BannerContent = styled.div`
  position: relative;
  max-width: 33%;
  padding: 20px;
  z-index: 1;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BannerText = styled.p`
  font-size: 1rem;
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
  background-color: #2f2f2f;
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, background-color 0.2s ease;
  
  &:hover {
    transform: scale(1.03);
    background-color: #800000;
  }
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

const EventTitle = styled.h3`
  margin-top: 8px;
  font-weight: bold;
`;

const EventDetail = styled.p`
  margin: 4px 0;
  font-size: 0.9rem;
`;

const EventDate = styled.span`
  font-size: 0.8rem;
  color: #bbb;
`;

const NoEventsMessage = styled.p`
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ViewButton = styled.button`
  background-color: #000000;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-top: 20px; // Added more top margin
  transition: background-color 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    background-color: #6a6a6a;
  }
`;
