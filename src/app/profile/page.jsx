"use client";
import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Avatar, 
  Stack, Divider, IconButton, MenuItem 
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

// Sample country list - you can expand this or fetch from an API
const countries = [
  { value: 'US', label: 'United States' },
  { value: 'DE', label: 'Germany' },
  { value: 'IN', label: 'India' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AE', label: 'United Arab Emirates' },
];

export default function PersonalInfo() {
  const [country, setCountry] = useState('US'); // Default value

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Personal Profile
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        Updating your details helps us provide a better shopping experience.
      </Typography>

      {/* Main Flex Wrapper for Avatar + Form */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 5 }}>
        
        {/* Avatar Section */}
        <Box sx={{ width: { xs: '100%', md: '120px' }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              sx={{ 
                width: 100, height: 100, fontSize: '2rem',
                bgcolor: 'primary.main', border: '3px solid', borderColor: 'divider'
              }}
            >
              JD
            </Avatar>
            <IconButton
              color="primary"
              component="label"
              sx={{
                position: 'absolute', bottom: 0, right: 0,
                bgcolor: 'background.paper', boxShadow: 1,
                '&:hover': { bgcolor: 'background.default' }
              }}
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Form Fields Section */}
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            
            {/* Name Fields */}
            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>First Name</Typography>
              <TextField fullWidth placeholder="John" sx={formStyles} />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Last Name</Typography>
              <TextField fullWidth placeholder="Doe" sx={formStyles} />
            </Box>

            {/* Contact Fields */}
            <Box sx={{ width: '100%' }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Email Address</Typography>
              <TextField fullWidth placeholder="john@example.com" sx={formStyles} />
            </Box>

            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Phone Number</Typography>
              <TextField fullWidth placeholder="+1 234 567 890" sx={formStyles} />
            </Box>

            {/* COUNTRY DROPDOWN */}
            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Country</Typography>
              <TextField
                select
                fullWidth
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                sx={formStyles}
              >
                {countries.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              disableElevation 
              sx={{ bgcolor: 'primary.main', textTransform: 'none', px: 3,fontSize:{xs:"12px",sm:"12px",md:"16px",lg:"16px"} }}
            >
              Save Changes
            </Button>
            <Button 
              variant="outlined" 
              sx={{ textTransform: 'none', px: 4, borderColor: 'divider', color: 'text.primary' }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

const formStyles = {
  '& .MuiOutlinedInput-root': {
    fontSize: '14px',
    borderRadius: '6px',
    '& fieldset': { borderColor: 'divider' },
    '&:hover fieldset': { borderColor: '#8B96A5' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  },
  '& .MuiInputBase-input': { py: 1.5 }
};