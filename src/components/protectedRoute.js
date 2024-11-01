import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
