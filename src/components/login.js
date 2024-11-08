import React, { useState } from 'react';
import { TextField, Button, Typography, Container, MenuItem, Select, FormControl, InputLabel, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    type: 'student'
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      console.error(`Login failed: ${JSON.stringify(err)}`)
      setMessage('Error logging in.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: '#dbabad', padding: '40px', borderRadius: '10px', marginTop: '40px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Log in to Account
        </Typography>
        </Box>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            name="type"
            label="Type"
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
            <MenuItem value="student" sx={{ color: '#000000'}}>Student</MenuItem>
            <MenuItem value="org" sx={{ color: '#000000'}}>Organization</MenuItem>
          </Select>
        </FormControl>
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
          Log in
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
        onClick={() => navigate('/register')}
        sx={{
          marginTop: '20px',
          cursor: 'pointer',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {"Don't have an account? Register now!"}
      </Typography>
    </Container>
  );


  // return (
  //   <Container maxWidth="xs">
  //     <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  //       <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
  //         <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mr: 2 }}>Penn Calendar</Typography>
  //         <img src=".../public/dp_logo.png" alt="Logo" style={{ width: 40, height: 40 }} />
  //       </Box>
  //       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
  //         <TextField
  //           margin="normal"
  //           required
  //           fullWidth
  //           id="email"
  //           label="Email"
  //           name="email"
  //           autoComplete="email"
  //           autoFocus
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //         />
  //         <TextField
  //           margin="normal"
  //           required
  //           fullWidth
  //           name="password"
  //           label="Password"
  //           type="password"
  //           id="password"
  //           autoComplete="current-password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //         <FormControl fullWidth margin="normal">
  //           <InputLabel id="type-label">Type</InputLabel>
  //           <Select
  //             labelId="type-label"
  //             id="type"
  //             value={type}
  //             label="Type"
  //             onChange={(e) => setType(e.target.value)}
  //           >
  //             <MenuItem value="student">Student</MenuItem>
  //             <MenuItem value="org">Organization</MenuItem>
  //           </Select>
  //         </FormControl>
  //         <Button
  //           type="submit"
  //           fullWidth
  //           variant="contained"
  //           color="primary"
  //           sx={{ mt: 3, mb: 2 }}
  //         >
  //           Login
  //         </Button>
  //         {message && (
  //           <Typography variant="body2" color="error">
  //             {message}
  //           </Typography>
  //         )}
  //         <Link href="/register" variant="body2" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
  //           Don't have an account? Register now!
  //         </Link>
  //       </Box>
  //     </Box>
  //   </Container>
  // );
};

export default Login;
