import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({onHandleChange}) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      fullWidth
      onChange={onHandleChange} // Call handleChange on input change
      sx={{
        maxWidth: 400,
        background: 'linear-gradient(135deg, #2E236C, #433D8B)',
        borderRadius: '8px',
        '& .MuiOutlinedInput-root': {
          color: '#FFFFFF',
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: '#535C91',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#9290C3',
          },
        },
        '& .MuiInputBase-input': {
          padding: '10px 16px',
          color: '#FFFFFF',
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon sx={{ color: '#9290C3' }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
