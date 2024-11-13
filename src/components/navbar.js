import React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
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
      <StyledContainer>
        <StyledToolbar>
          {/* Logo */}
          <LogoLink to="/">
            <Logo src="/dp_logo.png" alt="DP Logo" />
          </LogoLink>

          {/* Combined Navigation and Auth Container */}
          <RightContainer>
            {/* Navigation Items */}
            <NavContainer>
              <NavLink 
                as="a" 
                href="https://www.thedp.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Daily Pennsylvanian
              </NavLink>
            </NavContainer>

            {/* Auth Buttons */}
            <AuthContainer>
              {isAuthenticated ? (
                <>
                  {user.type === 'org' && (
                    <ActionButton to="/create-event">
                      Create Event
                    </ActionButton>
                  )}
                  <LoginButton to="/profile">
                    Profile
                  </LoginButton>
                  <RegisterButton onClick={handleLogout}>
                    Logout
                  </RegisterButton>
                </>
              ) : (
                <>
                  <LoginButton to="/login">
                    Login
                  </LoginButton>
                  <RegisterButton to="/register">
                    Register
                  </RegisterButton>
                </>
              )}
            </AuthContainer>
          </RightContainer>
        </StyledToolbar>
      </StyledContainer>
    </StyledAppBar>
  );
};

export default Navbar;

// Styled Components
const StyledAppBar = styled(AppBar)`
  background-color: #2f2f2f;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  background-color: #2f2f2f;
  padding: 0 24px; // Add consistent padding
`;

// Update the Container styling
const StyledContainer = styled(Container)`
  && {
    max-width: 100%;
    padding: 0;
    background-color: #2f2f2f;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 52px;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  font-family: 'Georgia', serif;
  transition: color 0.2s ease;
  white-space: nowrap;
  letter-spacing: 0.5px;

  &:hover {
    color: #cccccc;
  }
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LoginButton = styled(Link)`
  background-color: #000000;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    background-color: #6a6a6a;
  }
`;

const RegisterButton = styled(Link)`
  background-color: #8B0000;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  border: none;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    background-color: #660000;
  }
`;

const ActionButton = styled(Link)`
  background-color: transparent;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;