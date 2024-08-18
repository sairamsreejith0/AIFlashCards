import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import '../../app/globals.css';

export default function Footer() {
    return (
        <Box 
            component="footer" 
            className='gradient-button'
            sx={{ 
                backgroundColor: '#1B1A55', 
                color: 'white', 
                padding: 2, 
                textAlign: 'center' 
            }}
        >
            <Typography variant="body2" align="center">
                © QGenie
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
                <Link href="/Aboutus" color="inherit" sx={{ marginX: 2 }}>
                    About Us
                </Link>
                <Link href="/Pricing" color="inherit" sx={{ marginX: 2 }}>
                    Pricing
                </Link>
            </Box>
        </Box>
    );
}