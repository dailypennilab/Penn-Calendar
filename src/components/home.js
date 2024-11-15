// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Banner from './homeComponents/banner';
import EventCard from './eventCard';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventType, setEventType] = useState('');
  const [afterDate, setAfterDate] = useState('');
  const [beforeDate, setBeforeDate] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5038/events');
        const currentTime = new Date();

        const filteredEvents = response.data.data
          .filter(event => new Date(event.endTime) > currentTime)
          .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        const featured = filteredEvents.filter(event => event.featured).slice(0, 3);

        setEvents(filteredEvents);
        setFeaturedEvents(featured);
        setFilteredEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = events;

      if (searchQuery) {
        filtered = filtered.filter(event =>
          event.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (eventType) {
        filtered = filtered.filter(event => event.type === eventType);
      }

      if (afterDate) {
        const after = new Date(afterDate);
        filtered = filtered.filter(event => new Date(event.startTime) >= after);
      }

      if (beforeDate) {
        const before = new Date(beforeDate);
        filtered = filtered.filter(event => new Date(event.endTime) <= before);
      }

      setFilteredEvents(filtered);
    };

    applyFilters();
  }, [searchQuery, eventType, afterDate, beforeDate, events]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Date not available'
      : date.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });
  };

  return (
    <Container>
      <Banner featuredEvents={featuredEvents} />

      <FilterBar>
        <SearchInput
          type="text"
          placeholder="Search events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Dropdown value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <option value="">All Types</option>
          <option value="Conference">Conference</option>
          <option value="Event">Event</option>
          <option value="Seminar">Seminar</option>
          <option value="Meetup">Meetup</option>
          <option value="Other">Other</option>
        </Dropdown>
        <DateInput
          type="date"
          placeholder="After"
          value={afterDate}
          onChange={(e) => setAfterDate(e.target.value)}
        />
        <DateInput
          type="date"
          placeholder="Before"
          value={beforeDate}
          onChange={(e) => setBeforeDate(e.target.value)}
        />
      </FilterBar>

      <EventsGrid>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => {
            console.log("Event startTime:", event.startTime, "endTime:", event.endTime); // Log start and end times
            return (
              <EventCard
                key={event.id}
                id={event._id}
                imageUrl={event.imageUrl}
                name={event.name}
                type={event.type}
                description={event.description}
                startTime={formatDate(event.startTime)}
                endTime={formatDate(event.endTime)}
              />
            );
          })
        ) : (
          <NoEventsMessage>No events available</NoEventsMessage>
        )}
      </EventsGrid>
    </Container>
  );
};

export default Home;

// Styled Components for Home
const Container = styled.div`
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 20px;
  padding: 1rem;
  background-color: #2f2f2f;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 180px;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #444;
  background-color: #444;
  color: white;
  font-size: 1rem;
  outline: none;

  ::placeholder {
    color: #bbb;
  }
`;

const Dropdown = styled.select`
  flex: 1;
  min-width: 140px;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #444;
  background-color: #444;
  color: white;
  font-size: 1rem;
  outline: none;
`;

const DateInput = styled.input`
  flex: 1;
  min-width: 140px;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #444;
  background-color: #444;
  color: white;
  font-size: 1rem;
  outline: none;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NoEventsMessage = styled.p`
  font-size: 1rem;
  color: white;
  text-align: center;
  grid-column: span 3;
`;
