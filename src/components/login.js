import React, { useState } from 'react';
import { TextField, Button, Typography, Container, MenuItem, Select, FormControl, InputLabel, Link } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    type: 'student',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleType = () => {
    setLoginData({
      ...loginData,
      type: loginData.type === 'student' ? 'org' : 'student',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5038/login', loginData);
      console.log(response.data.data);
      // Redirect or show success message as per response
    } catch (err) {
      setMessage(err.message || 'Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          type="email"
        />
        
        <TextField
          label="Password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          type="password"
        />
        
        <FormControl fullWidth required margin="normal">
          <InputLabel>Login As</InputLabel>
          <Select
            name="type"
            value={loginData.type}
            onChange={handleChange}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="org">Organization</MenuItem>
          </Select>
        </FormControl>

        <Link
          component="button"
          variant="body2"
          onClick={toggleType}
          sx={{ display: 'block', margin: '10px 0' }}
        >
          {loginData.type === 'student' ? "Not a student? Log in as an organization" : "Not an organization? Log in as a student"}
        </Link>

        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
      {message && <Typography variant="body1" color="textSecondary">{message}</Typography>}
    </Container>
  );
};


export default Login;
