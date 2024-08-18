'use client'
import { Button, Typography } from "@mui/material";
import Page from './Dashboard/page';
import '../app/globals.css';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
     
        
     
          <Page/>
        
        

   
    </>
  );
}
