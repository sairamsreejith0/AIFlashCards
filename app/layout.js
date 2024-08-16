import {
  ClerkProvider,
} from '@clerk/nextjs';
import Header from './components/Header';
import '../app/globals.css'
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
