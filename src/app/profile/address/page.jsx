"use client";
import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Stack, 
  Divider, MenuItem, Grid 
} from '@mui/material';

const countries = [
  { value: 'US', label: 'United States' },
  { value: 'DE', label: 'Germany' },
  { value: 'IN', label: 'India' },
];

export default function AddressPage() {
  const [country, setCountry] = useState('US');

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Shipping Address
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        Manage your default shipping and billing addresses.
      </Typography>

      <Stack spacing={3}>
        {/* Address Line 1 */}
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Street Address</Typography>
          <TextField fullWidth placeholder="123 Main St, Suite 400" size="small" />
        </Box>

        {/* City & State (Flexbox Row) */}
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>City</Typography>
            <TextField fullWidth placeholder="New York" size="small" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>State/Province</Typography>
            <TextField fullWidth placeholder="NY" size="small" />
          </Box>
        </Box>

        {/* Zip & Country (Flexbox Row) */}
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Zip/Postal Code</Typography>
            <TextField fullWidth placeholder="10001" size="small" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Country</Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" disableElevation sx={{ textTransform: 'none', px: 4 }}>
            Save Address
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}   