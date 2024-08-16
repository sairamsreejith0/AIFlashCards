
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
            bgcolor:'#F2613F',
            color:'white'
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
             
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
            bgcolor:'green',
            color:'white'
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              
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
