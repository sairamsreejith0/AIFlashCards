"use client"; // This ensures the component is treated as a client component

import { Paper, Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import getStripe from '../utils/page';
import { SignedIn, SignedOut } from '@clerk/nextjs';

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
  return (
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
      <SignedIn>
      <Link href="/Playground" passHref>
        <Button variant="outlined" className='gradient-button' sx={{ color: 'white', marginTop: '1em' }}>
          + CREATE
        </Button>
      </Link>
      </SignedIn>
      <SignedOut>
      <Link href="/sign-in" passHref>
        <Button variant="outlined" className='gradient-button' sx={{ color: 'white', marginTop: '1em' }}>
          + CREATE
        </Button>
      </Link>
      </SignedOut>
    </Paper>
  );
}
