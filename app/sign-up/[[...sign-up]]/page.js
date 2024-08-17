import { SignUp } from '@clerk/nextjs'
import './signup.css'
  import { ClerkProvider } from '@clerk/nextjs'
  import { dark } from '@clerk/themes'
export default function Page() {
  return (
    
    <div className="container">
        <SignUp />
        </div>
  );
}