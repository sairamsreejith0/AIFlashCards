import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Header from './components/Header';
import Footer from './components/footer';
import '../app/globals.css';
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          showOptionalFields: false,
          socialButtonsPlacement: 'top',
          socialButtonsVariant: 'auto',
          helpPageUrl: '/help',
          privacyPageUrl: '/privacy',
          termsPageUrl: '/terms',
        },
        baseTheme: [dark, shadesOfPurple],
        variables: { colorPrimary: 'white' },
        signIn: {
          baseTheme: [shadesOfPurple],
          variables: { colorPrimary: 'white', fontSize: '19px' },
        },
        signUp: {
          baseTheme: [shadesOfPurple],
          variables: { colorPrimary: 'white', fontSize: '18px' },
        },
      }}
    >
      <html lang="en">
        <body className="custom-scrollable">
          <div className="layout">
            <Header />
            <div className="content" style={{ paddingTop: '64px' }}>
              {children}
            </div>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
