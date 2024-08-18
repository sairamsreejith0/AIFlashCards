"use client"; // This ensures the component is treated as a client component

import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Page() {
  return (
    <div style={{ textAlign: 'center' }}>
      <SignedIn>
        <Link href="/Playground">
          <Button variant="outlined" sx={{ color: 'white' }}>+ CREATE</Button>
        </Link>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button variant="outlined" sx={{ color: 'white' }}>+ CREATE</Button>
        </Link>
      </SignedOut>
    </div>
  );
}
