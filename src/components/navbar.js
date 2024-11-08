import React from 'react';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
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
    <AppBar position="static" sx={{ backgroundColor: '#808080' }}>
      <Container maxWidth="lg">
        <Toolbar>
          {/* Logo on the left side */}
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <img src="/dp_logo.png" alt="DP Logo" style={{ height: '40px' }} />
            </Link>
          </Box>

          <Box sx={{flexGrow: 8 }}></Box>

          {/* Links on the right side */}
          <Box sx={{ display: 'flex', gap: '10px' }}>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;