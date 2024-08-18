// src/components/CompactFlashcard.js

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CompactFlashcard = ({title,onClick}) => {
  return (
    <Card
      sx={{
        width: 150, // Set a fixed width for better grid alignment
        height: 80, // Set a fixed height
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 1,
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </CardContent>
     
    </Card>
  );
};

export default CompactFlashcard;
