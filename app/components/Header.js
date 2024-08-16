import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo on the left */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Button color="inherit">Logo</Button>
          </Link>
        </Typography>

        {/* Buttons on the right */}
        <SignedOut>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/sign-in" passHref>
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/sign-up" passHref>
              <Button color="inherit">Sign Up</Button>
            </Link>
          </Box>
        </SignedOut>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
