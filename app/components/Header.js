// src/components/Header.js

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Link from 'next/link';
import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { dark,neobrutalism } from '@clerk/themes';
import '../../app/globals.css';
export default function Header() {
  return (
    <AppBar position="static" className= 'gradient-button' sx={{ color: 'white'}}>
      <Toolbar>
        {/* Logo on the left */}
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Button sx={{ color: 'white', fontFamily: 'Poppins'}}>
            <Box
              component="img"
              src="/logo.jpg" // Update with your logo's path
              alt="QGenie Logo"
              sx={{ width: 45, height: 45, mr: 1 }} // Adjust size and spacing
            />
              QGenie</Button>
          </Link>
        </Typography>

        {/* Buttons on the right */}
        <SignedOut>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/sign-in" passHref>
              <Button className='gradient-button'sx={{ color: 'white' }}>Login</Button>
            </Link>
            <Link href="/sign-up" passHref>
              <Button  className='gradient-button' sx={{ color: 'white' }}>Sign Up</Button>
            </Link>
          </Box>
        
        </SignedOut>
        <SignedIn>
        <Link href="/Dashboard/myCollection" passHref>
              <Button  className='gradient-button' sx={{ color: 'white' }}>My Collection</Button>
            </Link>
        
          <UserButton 
          showName
          signOutUrl="/sign-in"
          />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}