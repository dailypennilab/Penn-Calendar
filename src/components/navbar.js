import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Button color="inherit">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
          </Button>

          {isAuthenticated ? (
            <>              
              <Button color="inherit">
                <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Profile
                </Link>
              </Button>

              {user.type === 'org' && (
                <Button color="inherit">
                  <Link to="/create-event" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Create Event
                  </Link>
                </Button>
              )}

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;