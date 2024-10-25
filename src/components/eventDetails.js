// src/components/EventDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { eventId } = useParams(); // Extract the eventId from the URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5038/events/${eventId}`);
        setEvent(response.data.data); // assuming response is in the form { success: true, data: {...} }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>Organizer: {event.organizer}</p>
      <p>Date and Time: {new Date(event.time).toLocaleString()}</p>
      <p>Description: {event.description}</p>
    </div>
  );
};

export default EventDetails;
