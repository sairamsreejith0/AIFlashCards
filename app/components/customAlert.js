// components/CustomAlert.js

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function CustomAlert({ open, onClose }) {
  const router = useRouter();

  const handleRedirect = () => {
    onClose(); // Close the dialog
    router.push('/Pricing'); // Redirect to the pricing page
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          backgroundColor: '#2E236C', // Overall background color
          borderRadius: '15px', // Rounded corners
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dimmed background
        },
      }}
    >
      <DialogTitle 
        id="alert-dialog-title" 
        sx={{ 
          color: 'white', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          borderBottom: '2px solid #9290C3', // Add a bottom border for emphasis
        }}
      >
        Oops! You are out of credits.
      </DialogTitle>
      <DialogContent sx={{ bgcolor: '#535C91', padding: '20px' }}>
        <DialogContentText 
          id="alert-dialog-description" 
          sx={{ 
            color: 'white', 
            fontSize: '1.1rem', 
            textAlign: 'center',
            lineHeight: '1.5', 
            padding: '10px 0', 
          }}
        >
          You’ve used all your free credits. Upgrade to Premium to continue generating more flashcards and enhance your learning experience.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', padding: '20px' }}>
        <Button 
          onClick={handleRedirect} 
          className='gradient-button'
          sx={{ 
            bgcolor: '#FF4C4C', 
            color: 'white', 
            fontWeight: 'bold', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            textTransform: 'none',
            '&:hover': { 
              bgcolor: '#FF1C1C', // Darker red on hover
            },
          }}
        >
          Try Premium
        </Button>
      </DialogActions>
    </Dialog>
  );
}
