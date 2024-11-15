// src/components/homeComponents/rightCol.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay
} from 'date-fns';

const RightCol = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const { user } = useAuth();
  const today = new Date();

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (!user || user.type !== 'student') {
        // If no user is logged in or the user is not a student, don't fetch events
        setRegisteredEvents([]);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5038/students/${user.id}/events`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRegisteredEvents(response.data.data);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };

    fetchRegisteredEvents();
  }, [user]);

  const renderHeader = () => (
    <Header>
      <MonthDisplay>{format(currentMonth, 'MMMM yyyy')}</MonthDisplay>
      <Navigation>
        <NavButton onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>&lt;</NavButton>
        <NavButton onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>&gt;</NavButton>
      </Navigation>
    </Header>
  );

  const renderDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <DaysRow>
        {daysOfWeek.map(day => (
          <Day key={day}>{day}</Day>
        ))}
      </DaysRow>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <DateCell
            key={day}
            isToday={isSameDay(day, today)}
            isCurrentMonth={isSameMonth(day, monthStart)}
          >
            <span>{format(day, 'd')}</span>
          </DateCell>
        );
        day = addDays(day, 1);
      }
      rows.push(<WeekRow key={day}>{days}</WeekRow>);
      days = [];
    }

    return <DatesBody>{rows}</DatesBody>;
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
      <Calendar>
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </Calendar>
      <ScrollableBottom>
        <RegisteredTitle>Registered Events</RegisteredTitle>
        {registeredEvents.length > 0 ? (
          registeredEvents.map(event => (
            <EventBox key={event._id}>
              <EventTitle>{event.name}</EventTitle>
              <EventTime>{formatDate(event.startTime)}</EventTime>
            </EventBox>
          ))
        ) : (
          <p>No registered events available</p>
        )}
      </ScrollableBottom>
    </Container>
  );
};

export default RightCol;

// Styled Components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 80vh;
`;

const Calendar = styled.div`
  background-color: #2f2f2f;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  height: 40vh;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const MonthDisplay = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Navigation = styled.div`
  display: flex;
  gap: 10px;
`;

const NavButton = styled.button`
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #c0c0c0;
  }
`;

const DaysRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #666;
  margin-bottom: 10px;
`;

const Day = styled.div`
  width: 100%;
  text-align: center;
`;

const DatesBody = styled.div``;

const WeekRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateCell = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isCurrentMonth }) => (isCurrentMonth ? '#000' : '#ccc')};
  background-color: ${({ isToday }) => (isToday ? '#000' : 'transparent')};
  color: ${({ isToday }) => (isToday ? '#bbb' : '#fff')};
  font-weight: ${({ isToday }) => (isToday ? 'bold' : 'normal')};
  border-radius: 4px;

  span {
    display: block;
    text-align: center;
  }
`;

const ScrollableBottom = styled.div`
  background-color: #2f2f2f;
  color: white;
  padding: 20px;
  border-radius: 8px;
  height: 40vh;
  overflow-y: auto;
`;

const RegisteredTitle = styled.h3`
  margin-bottom: 10px;
  font-weight: bold;
`;

const EventBox = styled.div`
  background-color: #444;
  color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  text-align: left;
`;

const EventTitle = styled.h4`
  margin: 0;
  font-weight: bold;
`;

const EventTime = styled.p`
  margin: 5px 0 0;
  color: #bbb;
  font-size: 0.9rem;
`;
