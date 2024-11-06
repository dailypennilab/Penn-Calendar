// import React, { useEffect, useState } from 'react';
// import { TextField, Button, Typography, Container, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
// import axios from 'axios';
// import { useAuth } from '../context/authContext';

// const EventRegistrationForm = () => {
//   const { user } = useAuth();

//   const [eventData, setEventData] = useState({
//     name: '',
//     organizer: user.id,
//     time: '',
//     description: '',
//   });

//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setEventData({
//       ...eventData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5038/events', eventData);
//       setMessage(`Event "${response.data.data.name}" created successfully for user ${user.name}!`);
//     } catch (error) {
//       setMessage('Error creating event. Please try again.');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" component="h1" gutterBottom>
//         Register a New Event
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Event Name"
//           name="name"
//           value={eventData.name}
//           onChange={handleChange}
//           fullWidth
//           required
//           margin="normal"
//         />
        
//         <TextField
//           label="Time"
//           name="time"
//           type="datetime-local"
//           value={eventData.time}
//           onChange={handleChange}
//           fullWidth
//           required
//           InputLabelProps={{
//             shrink: true,
//           }}
//           margin="normal"
//         />
        
//         <TextField
//           label="Description"
//           name="description"
//           value={eventData.description}
//           onChange={handleChange}
//           fullWidth
//           multiline
//           rows={4}
//           margin="normal"
//         />
        
//         <Button variant="contained" color="primary" type="submit">
//           Submit
//         </Button>
//       </form>
//       {message && <Typography variant="body1" color="textSecondary">{message}</Typography>}
//     </Container>
//   );
// };

// export default EventRegistrationForm;


import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container, MenuItem, InputLabel, FormControl, Select } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const EventRegistrationForm = () => {
  const { user } = useAuth();

  const [eventData, setEventData] = useState({
    name: '',
    organizer: user.id,
    type: '',
    location: '',
    time: '',
    description: '',
    qualifications: '',
    registrationForm: '',
    imageUrl: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5038/events', eventData);
      setMessage(`Event "${response.data.data.name}" created successfully for user ${user.name}!`);
    } catch (error) {
      setMessage('Error creating event. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Register a New Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Name"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            name="type"
            value={eventData.type}
            onChange={handleChange}
          >
            <MenuItem value="Workshop">Workshop</MenuItem>
            <MenuItem value="Seminar">Seminar</MenuItem>
            <MenuItem value="Conference">Conference</MenuItem>
            <MenuItem value="Meetup">Meetup</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </FormControl>

        <TextField
          label="Location"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Time"
          name="time"
          type="datetime-local"
          value={eventData.time}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />

        <TextField
          label="Description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />

        <TextField
          label="Registration Form URL"
          name="registrationForm"
          value={eventData.registrationForm}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Image URL"
          name="imageUrl"
          value={eventData.imageUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="URL to an image for the event."
        />


        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: '10px' }}>
          Submit
        </Button>
      </form>
      {message && <Typography variant="body1" color="textSecondary">{message}</Typography>}
    </Container>
  );
};

export default EventRegistrationForm;
