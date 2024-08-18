import { Card, CardContent, Typography, Box } from '@mui/material';

export default function Flashcard({ question, answer }) {
  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '345px',
        margin: '16px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '200px',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          '&:hover': {
            transform: 'rotateY(180deg)',
          },
        }}
      >
        {/* Front Side */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#2E236C',
            color: 'white',
          }}
        >
          <CardContent
            sx={{
              overflowY: 'scroll', // Enable vertical scrolling
              maxHeight: '100%', // Ensure it does not exceed card height
              '&::-webkit-scrollbar': {
                display: 'none', // Hide scrollbar for WebKit browsers
              },
              '-ms-overflow-style': 'none',  // Hide scrollbar for IE and Edge
              'scrollbar-width': 'none',  // Hide scrollbar for Firefox
            }}
          >
            <Typography variant="h6" component="div">
              {/* Add a title or leave it empty */}
            </Typography>
            <Typography variant="body2" color="inherit">
              {question}
            </Typography>
          </CardContent>
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
            bgcolor: '#535C91',
            color: 'white',
          }}
        >
          <CardContent
            sx={{
              overflowY: 'scroll', // Enable vertical scrolling
              maxHeight: '100%', // Ensure it does not exceed card height
              '&::-webkit-scrollbar': {
                display: 'none', // Hide scrollbar for WebKit browsers
              },
              '-ms-overflow-style': 'none',  // Hide scrollbar for IE and Edge
              'scrollbar-width': 'none',  // Hide scrollbar for Firefox
            }}
          >
            <Typography variant="h6" component="div">
              {/* Add a title or leave it empty */}
            </Typography>
            <Typography variant="body2" color="inherit">
              {answer}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
