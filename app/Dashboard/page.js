import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs';
export default function Page()
{
    return (
        <>
        <SignedIn>
            <UserButton />
            <h1>dashboard</h1>
          </SignedIn> 
          </>
        
    );
}