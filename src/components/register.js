import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [isStudentForm, setIsStudentForm] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    orgType: '',
    major: '',
    graduationYear: '',
    linkedin: '',
    imageUrl: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5038/register/student', formData);
      setMessage(response.data.success ? `Registration successful for ${response.data.data.name}` : response.data.message);
    } catch (error) {
      setMessage('Error during registration. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: '#dbabad', padding: '40px', borderRadius: '10px', marginTop: '40px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          {'Create an Account'}
        </Typography>
      </Box>
      
      <form onSubmit={handleSubmit}>        
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
        />
        
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
        />
        
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
        />

        <TextField
          label="Major"
          name="major"
          value={formData.major}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
        />
        
        <TextField
          label="Graduation Year"
          name="graduationYear"
          type="number"
          value={formData.graduationYear}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
        />

        <TextField
          label="LinkedIn Profile URL"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
        />
        
        <TextField
          label="Profile Picture URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          onClick={handleSubmit}
          sx={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#a9a9a9',
            color: '#000000',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#888888' },
            borderRadius: '20px',
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: '16px',
          }}
        >
          Register
        </Button>
      </form>

      {message && (
        <Typography variant="body1" color="textSecondary" sx={{ marginTop: '20px' }}>
          {message}
        </Typography>
      )}

<Typography
        variant="body2"
        color="primary"
        sx={{
          marginTop: '20px',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Want to register an organization? Contact us at{' '}
        <a
          href="mailto:ilabmanager@dailypennsylvanian.com"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          ilabmanager@dailypennsylvanian.com
        </a>
        !
      </Typography>
    </Container>
  );
};

export default Register;
