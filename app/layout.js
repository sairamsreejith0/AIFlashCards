import {
  ClerkProvider,
} from '@clerk/nextjs';
import Header from './components/Header';
import '../app/globals.css'
import { neobrutalism } from '@clerk/themes';
export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme:[neobrutalism],
    }}>
       
      <html lang="en">
        <body className="custom-scrollable">
       
          <Header/>
          <div className="content">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
