import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Container, Box } from '@mui/material';

// Function to fetch developer data from GitHub API
async function fetchDevelopers() {
  const developers = [
    { username: 'pravallikabollavaram', name: 'Pravallika Bollavaram' },
    { username: 'sairamsreejith0', name: 'Venkata Sairam Nagilla' },
    { username: 'harsha-1718', name: 'Harshavardhan Reddy Yarmareddy' },
    // Add more GitHub usernames here
  ];

  const promises = developers.map(async (dev) => {
    const res = await fetch(`https://api.github.com/users/${dev.username}`);
    const data = await res.json();
    return {
      ...dev,
      image: data.avatar_url, // Get the profile picture URL
      bio: data.bio || 'Full Stack Developer', // Get the bio or use a default value
    };
  });

  return await Promise.all(promises);
}

// Server Component that renders the About Us page
export default async function AboutUs() {
  const developers = await fetchDevelopers(); // Fetch GitHub data

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h2" align="center" gutterBottom color={'white'} fontFamily={'Roboto'}>
        Meet the Developers
      </Typography>
      <Grid container spacing={4} fontFamily={'Roboto'}>
        {developers.map((developer) => (
          <Grid item key={developer.username} xs={12} sm={6} md={4}>
            <Box
              sx={{
                perspective: '1000px',
                width: '250px', // Adjusted width
                height: '250px', // Adjusted height
                margin: '0 auto', // Center the card within the grid item
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s',
                  '&:hover': {
                    transform: 'rotateY(180deg)',
                  },
                }}
              >
                {/* Front Side */}
                <Card
                 className='gradient-button'
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    alt={developer.name}
                    src={developer.image}
                    sx={{ width: 120, height: 120, marginBottom: 2 }} // Increased avatar size
                  />
                  <Typography variant="h6" align="center">
                    {developer.name}
                  </Typography>
                </Card>

                {/* Back Side */}
                <Card
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    bgcolor: '#f7f7f7',
                  }}
                >
                  <CardContent>
                    <Typography variant="body2" align="center" color="textSecondary">
                      {developer.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
