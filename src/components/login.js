import React, { useState } from 'react';
import { TextField, Button, Typography, Container, MenuItem, Select, FormControl, InputLabel, Link, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('student');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password, type });
      navigate('/');
    } catch (err) {
      console.error(`Login failed: ${JSON.stringify(err)}`)
      setMessage('Error logging in.');
    }
  };


  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mr: 2 }}>Penn Calendar</Typography>
          <img src="logo-url-here" alt="Logo" style={{ width: 40, height: 40 }} />
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="org">Organization</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {message && (
            <Typography variant="body2" color="error">
              {message}
            </Typography>
          )}
          <Link href="/register" variant="body2" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
            Register now!
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
