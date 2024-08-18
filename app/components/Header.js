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

export default function Header() {
  return (
    <AppBar position="fixed" sx={{ bgcolor: 'var(--color-accent)', color: 'white'}}>
      <Toolbar>
        {/* Logo on the left */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Button sx={{ color: 'white' }}>Logo</Button>
          </Link>
        </Typography>

        {/* Buttons on the right */}
        <SignedOut>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/sign-in" passHref>
              <Button sx={{ color: 'white' }}>Login</Button>
            </Link>
            <Link href="/sign-up" passHref>
              <Button sx={{ color: 'white' }}>Sign Up</Button>
            </Link>
          </Box>
          <RedirectToSignIn/>
        </SignedOut>
        <SignedIn>
        <Link href="/Dashboard/myCollection" passHref>
              <Button sx={{ color: 'white' }}>My Collection</Button>
            </Link>
          <UserButton
            
           
          />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
