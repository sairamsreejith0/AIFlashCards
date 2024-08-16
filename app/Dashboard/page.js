
  import { Button } from '@mui/material';
  import Flashcards from '../Playground/page';
  import Link from 'next/link';
  
  export default function Page() {
    return (
    
        
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link href="/Playground"><Button variant="outlined" sx={{color:'white'}}>+ CREATE</Button></Link>
            </div>
         
          
          
        
      
    );
  }
  