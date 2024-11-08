import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      className="footer"
      sx={{
        backgroundColor: '#808080',
        color: 'white',
        padding: '20px 0',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © 2024 Innovation Lab at The Daily Pennsylvanian
        </Typography>

        <Typography variant="body2" align="center" sx={{ marginTop: '10px' }}>
          All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;