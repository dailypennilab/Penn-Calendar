// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (user.type === 'org') {
        try {
          const response = await axios.get(`http://localhost:5038/organizations/${user.id}/events`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          setEvents(response.data.data); // Assuming `data.data` contains the events array
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      }
    };
    fetchEvents();
  }, [user.type, user.id]);

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5038/events/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error(`Error deleting event: ${error}`);
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      <h2>Welcome, {user.name}!</h2>
      
      {/* Display organizer events if the user type is 'org' */}
      {user.type === 'org' && (
        <div>
          <h3>Your Events</h3>
          {events.length > 0 ? (
            <ul>
              {events.map(event => (
                <div key={event._id}>
                  <h4>{event.name}</h4>
                  <p>{event.description}</p>
                  <button onClick={() => deleteEvent(event._id)}>Delete Event</button>
                </div>
              ))}
            </ul>
          ) : (
            <p>No events organized yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
