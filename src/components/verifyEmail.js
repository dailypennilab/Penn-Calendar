import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Hook to navigate to different routes

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token'); // Extract token from URL

      if (!token) {
        setMessage('Invalid verification link.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5038/verify-email`, {
          params: { token }, // Pass token to the backend
        });
        setMessage(response.data.message); // Display success message from the server

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setMessage(
          error.response?.data?.message || 'Verification failed. The link may have expired.'
        );
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Email Verification</h1>
      <p>{message}</p>
      {message === 'Email verified successfully!' && (
        <p>Redirecting to login page...</p>
      )}
    </div>
  );
};

export default VerifyEmail;
