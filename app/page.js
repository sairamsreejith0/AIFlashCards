'use client'
import { Button } from "@mui/material";
// import getStripe from "./utils/page";
// import Header from './components/Header';
import Page from './Dashboard/page'
import '../app/globals.css'
import { SignedIn,SignedOut } from "@clerk/nextjs";
export default function Home() {
    // const handleSubmit = async () => {
    //     const checkoutSession = await fetch('/api/checkout_sessions', {
    //       method: 'POST',
    //       headers: { origin: 'http://localhost:3000' },
    //     })
    //     const checkoutSessionJson = await checkoutSession.json()
      
    //     const stripe = await getStripe()
    //     const {error} = await stripe.redirectToCheckout({
    //       sessionId: checkoutSessionJson.id,
    //     })
      
    //     if (error) {
    //       console.warn(error.message)
    //     }
    //   }
  return (
    <>
    <SignedIn>
    <Page/>
    </SignedIn>
    {/* <Button  variant="contained"  color="primary"  sx={{mt: 2, mr: 2}} onClick={handleSubmit}>Pricing</Button> */}
    <SignedOut>
      <h1>home page</h1>
    </SignedOut>
   </>
  );
}
