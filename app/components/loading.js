
import { Box,Typography } from "@mui/material"
export default function Loading({msg})
{
    return (
<Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the screen
            zIndex: 1000, // Ensure it appears above other content
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="div" color="white" gutterBottom>
            {msg}
          </Typography>
          <Box
            sx={{
              width: '80px',
              height: '80px',
              borderRadius: '50%', // Makes the box circular
              overflow: 'hidden', // Ensures the image fits within the circle
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '4px solid white', // Optional: Adds a white border around the circle
            }}
          >
            <img
              src="/genielamp.png"
              alt="Loading..."
              style={{
                width: '100%', // Adjusts the image size to fit within the circle
                height: 'auto', // Maintains the aspect ratio
                animation: 'spin 2s linear infinite',
              }}
            />
          </Box>
          <style jsx>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </Box>

)};