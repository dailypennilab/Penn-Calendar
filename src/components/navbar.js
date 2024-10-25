import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Button color="inherit">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
          </Button>

          <Button color="inherit">
            <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
              Login
            </Link>
          </Button>

          <Button color="inherit">
            <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
              Register
            </Link>
          </Button>

          <Button color="inherit">
            <Link to="/create-event" style={{ color: 'inherit', textDecoration: 'none' }}>
              Create Event
            </Link>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
