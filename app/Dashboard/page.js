"use client"; // This ensures the component is treated as a client component

import { Paper, Box, Typography, Grid, Button } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

export const handleSubmit = async () => {
  try {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000/' },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
  }
};

export default function Page() {
  const [isDistributed, setIsDistributed] = useState(false);

  const cards = [
    {
      title: "Custom Flashcards from Any Source",
      content: "Enter a keyword, paragraph, or webpage link.",
    },
    {
      title: "Choose Your Output",
      content: "Generate Q&A flashcards or extract key insights from your input.",
    },
    {
      title: "Save and Manage Flashcards",
      content: "Organize your flashcards into collections and access them anytime.",
    }
  ];

  const handleCardClick = () => {
    setIsDistributed(true);
  };

  return (
    <>
      <Paper
        elevation={24} // Adds a deep shadow for elevation
        sx={{
          backgroundColor: '#2C2F5C',
          borderRadius: '16px', // Rounded corners
          padding: '2em',
          marginTop: '2em',
          textAlign: 'center',
          color: 'white',
          maxWidth: '600px',
          margin: '2em auto', // Center the box horizontally
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)', // Reduced white shadow for borders
        }}
      >
        <Typography variant="h5" gutterBottom>
          Master any topic in minutes with QGenie!
        </Typography>
        <Typography variant="body1" gutterBottom fontFamily={"Roboto"}>
          Turn any text into exam-ready flashcards instantly. Prepare smarter, not harder—your study genie awaits!
        </Typography>
        <Link href="/Playground" passHref>
          <Button variant="outlined" className='gradient-button' sx={{ color: 'white', marginTop: '1em' }}>
            + CREATE
          </Button>
        </Link>
      </Paper>

      {/* Features Section with Stacked Cards */}
      <Box sx={{ marginTop: '4em', textAlign: 'center', color: '#ffffff', position: 'relative', zIndex: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '4em', color: '#ffffff' }}>
          Features
        </Typography>
        <Box
          sx={{
            position: 'relative',
            width: '350px',
            height: '200px',
            margin: '0 auto',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '4em', // Adds space between Features and How It Works sections
            zIndex: 1, // Ensure the cards are behind the heading
          }}
        >
          {cards.map((card, index) => {
            const positionStyles = isDistributed
              ? {
                  transform: `translateX(${index * 400 - 400}px) translateY(-50px)`,
                  zIndex: 10,
                }
              : {
                  transform: `translateY(${index * 10}px)`,
                  zIndex: 1,
                };

            return (
              <Paper
                key={index}
                elevation={12}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  padding: '1em',
                  backgroundColor: '#535C91',
                  color: 'white',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'transform 0.5s ease',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                  ...positionStyles,
                }}
                onClick={handleCardClick}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5em' }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  {card.content}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Box>

      {/* How It Works Section */}
      <Paper
        elevation={12}
        sx={{
          backgroundColor: '#535C91', // Background color for How It Works
          borderRadius: '16px',
          padding: '2em',
          marginTop: '4em', // Adds space above How It Works section
          textAlign: 'center',
          color: 'white',
          maxWidth: '1000px', // Adjust the max width to fit the content
          margin: '2em auto', // Center the box horizontally
        }}
      >
        <Typography variant="h5" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: 'white',
                color: '#535C91',
                width: 60,
                height: 60,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              1
            </Box>
            <Typography variant="body1" sx={{ marginTop: '1em' }}>
              Provide your Input
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: 'white',
                color: '#535C91',
                width: 60,
                height: 60,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              2
            </Box>
            <Typography variant="body1" sx={{ marginTop: '1em' }}>
              Click "Generate"
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: 'white',
                color: '#535C91',
                width: 60,
                height: 60,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              3
            </Box>
            <Typography variant="body1" sx={{ marginTop: '1em' }}>
              Review and save the flashcards to your collection
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
