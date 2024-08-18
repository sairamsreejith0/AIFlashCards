import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CompactFlashcard = ({ title, onClick }) => {
  return (
    <Card
      sx={{
        width: 200, // Set a fixed width for better grid alignment
        height: 120, // Adjusted height for a more substantial feel
        margin: 2, // Added margin to prevent overlap and provide spacing
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 2, // Added padding for better content spacing
        background: 'linear-gradient(135deg, #070F2B 0%, #1B1A55 33%, #535C91 66%, #9290C3 100%)', // Multi-step gradient with specified colors
        borderRadius: '16px', // Rounded corners
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', // Slightly larger shadow for depth
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)', // Slight lift effect on hover
          boxShadow: '0 15px 25px rgba(0, 0, 0, 0.15)', // Deeper shadow on hover
        },
        '&:active': {
          transform: 'translateY(0)', // Reset on click
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Softer shadow on click
        },
      }}
      onClick={onClick}
    >
      <CardContent
        sx={{
          padding: 0, // Remove default padding
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%', // Center content vertically
        }}
      >
        <Typography
          variant="h6" // Slightly larger title
          component="div"
          sx={{ 
            fontWeight: 'bold',
            color: '#fff', // White text for contrast
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', // Subtle text shadow for depth
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompactFlashcard;
