"use client"; // This ensures the component is treated as a client component

import { Box, Button } from '@mui/material';
import Flashcards from '../Playground/page';
import Link from 'next/link';
import getStripe from '../utils/page';
import { SignedIn, SignedOut } from '@clerk/nextjs';



export const handleSubmit = async () => { // Exporting handleSubmit function
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
    <>
   
    <div style={{ textAlign: 'center' }}>
      <Link href="/Playground">
        <Button variant="outlined" sx={{ color: 'white' }}>+ CREATE</Button>
      </Link>
      {/* <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2,  backgroundColor: '#1B1A55',  }} onClick={handleSubmit}>
        Pricing
      </Button> */}
    </div>
   
   
    </>
  );
}
