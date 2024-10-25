import React, { useState } from 'react';
import { TextField, Button, Typography, Container, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [isStudentForm, setIsStudentForm] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    orgType: 'student organization',
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
    setFormData({
      name: '',
      email: '',
      password: '',
      orgType: 'student organization',
    });
    setMessage('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        {isStudentForm ? 'Register as a Student' : 'Register as an Organization'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        {!isStudentForm && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Organization Type</InputLabel>
            <Select
              name="orgType"
              value={formData.orgType}
              onChange={handleChange}
              required
            >
              <MenuItem value="student organization">Student Organization</MenuItem>
              <MenuItem value="company">Company</MenuItem>
            </Select>
          </FormControl>
        )}
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
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
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
      {message && <Typography variant="body1" color="textSecondary">{message}</Typography>}
      <Typography
        variant="body2"
        color="primary"
        onClick={toggleForm}
        style={{ marginTop: '16px', cursor: 'pointer' }}
      >
        {isStudentForm ? 'Not a student? Register an organization.' : 'Not an organization? Register a student.'}
      </Typography>
    </Container>
  );
};

export default Register;
