// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import styled from 'styled-components';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <StyledToolbar>
          {/* Logo on the left side */}
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Logo src="/dp_logo.png" alt="DP Logo" />
            </Link>
          </Box>

          {/* Navigation Links in the center */}
          <NavLinks>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/sponsors">Sponsors</NavLink>
            <ExternalLink href="https://www.thedp.com" target="_blank" rel="noopener noreferrer">
              Daily Pennsylvanian
            </ExternalLink>
          </NavLinks>

          {/* Buttons on the right side */}
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

                <StyledButton variant="contained" onClick={handleLogout}>
                  Logout
                </StyledButton>
              </>
            ) : (
              <>
                <StyledButton variant="outlined">
                  <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Login
                  </Link>
                </StyledButton>

                <StyledButton variant="contained">
                  <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Register
                  </Link>
                </StyledButton>
              </>
            )}
          </Box>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;

// Styled Components
const StyledAppBar = styled(AppBar)`
  background-color: #808080;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 60px;
`;

const NavLinks = styled(Box)`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;
  font-family: 'Arial', sans-serif;

  &:hover {
    color: #ffcc00;
  }
`;

const ExternalLink = styled.a`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;
  font-family: 'Arial', sans-serif;

  &:hover {
    color: #ffcc00;
  }
`;

const StyledButton = styled(Button)`
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  font-weight: 600;

  &:hover {
    background-color: #ffcc00;
    color: #000000;
  }

  &:first-of-type {
    border-color: #ffffff;
    color: #ffffff;
  }
`;
