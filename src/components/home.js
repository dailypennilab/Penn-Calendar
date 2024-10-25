// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5038/events');
        setEvents(response.data.data); // assuming response is in the form { success: true, data: [...] }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Event List</h1>
      {events.length > 0 ? (
        events.map(event => (
          <div key={event._id} style={{ margin: '10px 0' }}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <Link to={`/events/${event._id}`}>
              <button>View Event</button>
            </Link>
          </div>
        ))
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

export default Home;
