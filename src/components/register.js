import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [isStudentForm, setIsStudentForm] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    orgType: ''
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
      const endpoint = isStudentForm
        ? 'http://localhost:5038/register/student'
        : 'http://localhost:5038/register/org';

      const response = await axios.post(endpoint, formData);
      setMessage(response.data.success ? `Registration successful for ${response.data.data.name}` : response.data.message);
    } catch (error) {
      setMessage('Error during registration. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsStudentForm(!isStudentForm);
    setMessage('');
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: '#dbabad', padding: '40px', borderRadius: '10px', marginTop: '40px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          {isStudentForm ? 'Register as Student' : 'Register as Organization'}
        </Typography>
      </Box>
      
      <form onSubmit={handleSubmit}>
        { !isStudentForm && (
          <FormControl fullWidth margin="normal">
          <InputLabel id="type-label">Organization Type</InputLabel>
          <Select
            labelId="type-label"
            id="orgType"
            name="orgType"
            label="Organization Type"
            value={formData.type}
            onChange={handleChange}
            sx={{
              backgroundColor: '#f0f0f0',
              color: '#000000',
              '& .MuiSelect-select': {
                color: '#000000',
              },
            }}
          >
            <MenuItem value="student_org" sx={{ color: '#000000'}}>Student Organization</MenuItem>
            <MenuItem value="company" sx={{ color: '#000000'}}>Company</MenuItem>
          </Select>
          </FormControl>
        )}
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

        {/* Register Button */}
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

      {/* Message */}
      {message && (
        <Typography variant="body1" color="textSecondary" sx={{ marginTop: '20px' }}>
          {message}
        </Typography>
      )}

      {/* Toggle Form Type */}
      <Typography
        variant="body2"
        color="primary"
        onClick={toggleForm}
        sx={{
          marginTop: '20px',
          cursor: 'pointer',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {isStudentForm ? "Not a student? Register as an organization." : "Not an organization? Register as a student."}
      </Typography>
    </Container>
  );
};

export default Register;