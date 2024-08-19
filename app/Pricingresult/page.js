'use client';
import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Paper, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Link from 'next/link';
import { handleSubmit } from '../Dashboard/page'; // Import handleSubmit from Dashboard/Page.js

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState('monthly');

    const handleBillingCycleChange = (event, newCycle) => {
        if (newCycle !== null) {
            setBillingCycle(newCycle);
        }
    };

    // Pricing details based on billing cycle
    const premiumPrice = billingCycle === 'yearly' ? '$5' : '$49.99';
    const premiumSubText = billingCycle === 'yearly' ? 'per month (billed yearly)' : 'per month';

    return (
        <Box sx={{ padding: 4 }}>
           <Typography variant="h6" align="center" gutterBottom sx={{ color: '#535C91' }}>
            Expand your knowledge, dive into the details.
            </Typography>

            <Box display="flex" justifyContent="center" alignItems="center" marginBottom={3}>
                <ToggleButtonGroup
                    value={billingCycle}
                    exclusive
                    onChange={handleBillingCycleChange}
                    sx={{
                        borderRadius: 20,
                        backgroundColor: '#f5f5f5',
                        padding: '5px',
                    }}
                >
                    <ToggleButton 
                        value="yearly" 
                        sx={{ 
                            borderRadius: 20, 
                            padding: '10px 20px', 
                            '&:hover': {
                                backgroundColor: '#9290C3', // Change color on hover to 9290C3
                                color: 'white', // Optional: change text color on hover
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#535C91', // Selected color 535C91
                                color: 'white', // Text color when selected
                                '&:hover': {
                                    backgroundColor: '#9290C3', // Change color on hover even when selected
                                },
                            },
                        }}
                    >
                        Yearly
                    </ToggleButton>
                    <ToggleButton 
                        value="monthly" 
                        sx={{ 
                            borderRadius: 20, 
                            padding: '10px 20px', 
                            '&:hover': {
                                backgroundColor: '#9290C3', // Change color on hover to 9290C3
                                color: 'white', // Optional: change text color on hover
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#535C91', // Selected color 535C91
                                color: 'white', // Text color when selected
                                '&:hover': {
                                    backgroundColor: '#9290C3', // Change color on hover even when selected
                                },
                            },
                        }}
                    >
                        Monthly
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            
            <Grid container spacing={4} justifyContent="center">
                {/* Free Plan */}
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 3, borderRadius: 4 }}>
                        <Typography variant="h6" align="center" color="textSecondary">
                            Free Trial
                        </Typography>
                        <Typography variant="h4" align="center" gutterBottom>
                            Free
                        </Typography>
                        <Typography align="center" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
                            Your Monthly Uploads:
                        </Typography>
                        <Typography align="center" component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
                            <li>✓ 2 times per month</li>
                        </Typography>
                        <Typography align="center" sx={{ marginY: 3, fontWeight: 'bold' }}>
                            What You’ll Get with Each Upload:
                        </Typography>
                        <Typography align="center" component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
                            <li>✓ 10 tailored Q&As from your keyword, paragraph, or link</li>
                            <li>✓ Key insights and takeaways from your paragraph or link</li>
                        </Typography>
                        <Link href="/Dashboard" passHref>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ marginTop: 3, backgroundColor: '#1D267D', '&:hover': { backgroundColor: '#535C91' } }}
                            >
                                Get Started for Free
                            </Button>
                        </Link>
                    </Paper>
                </Grid>

                {/* Premium Plan */}
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 3, borderRadius: 4 }}>
                        <Typography variant="h6" align="center" color="textSecondary">
                            Premium
                        </Typography>
                        <Typography variant="h4" align="center" gutterBottom>
                            {premiumPrice} <Typography variant="subtitle1" component="span">{premiumSubText}</Typography>
                        </Typography>
                        <Typography align="center" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
                            Your Monthly Uploads:
                        </Typography>
                        <Typography align="center" component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
                            <li>✓ Unlimited times</li>
                        </Typography>
                        <Typography align="center" sx={{ marginY: 3, fontWeight: 'bold' }}>
                            What You’ll Get with Each Upload:
                        </Typography>
                        <Typography align="center" component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
                            <li>✓ 10 tailored Q&As from your keyword, paragraph, or link</li>
                            <li>✓ Key insights and takeaways from your paragraph or link</li>
                            <li>✓ Analysis of a YouTube video</li>
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ marginTop: 3, backgroundColor: '#1D267D', '&:hover': { backgroundColor: '#535C91' } }}
                            onClick={handleSubmit} // Use handleSubmit here
                        >
                            Upgrade to Premium
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}