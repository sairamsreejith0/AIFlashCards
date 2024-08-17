import {
  ClerkProvider,
} from '@clerk/nextjs';
import Header from './components/Header';
import '../app/globals.css'
import { dark,neobrutalism,shadesOfPurple } from '@clerk/themes';
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
      baseTheme: [dark,shadesOfPurple],
      variables: { colorPrimary: 'white' },
      signIn: {
        baseTheme: [shadesOfPurple],
        variables: { colorPrimary: 'white', fontSize:'19px' },

      },
      signUp: {
        baseTheme: [shadesOfPurple],
        variables: { colorPrimary: 'white', fontSize:'18px' },
      },
    }}
    // {...pageProps}
  >
      <html lang="en">
        <body className="custom-scrollable">
       
          <Header/>
          <div className="content">{children}</div>
          
         
        </body>
      </html>
    </ClerkProvider>
  );
}
