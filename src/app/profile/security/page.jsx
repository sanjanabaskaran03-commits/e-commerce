"use client";
import React from 'react';
import { Box, Typography, TextField, Button, Stack, Divider } from '@mui/material';

export default function SecurityPage() {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Security Settings
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        Manage your password and account security preferences.
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: '400px' }}>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Current Password</Typography>
          <TextField fullWidth type="password" placeholder="••••••••" size="small" />
        </Box>

        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>New Password</Typography>
          <TextField fullWidth type="password" placeholder="••••••••" size="small" />
        </Box>

        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Confirm New Password</Typography>
          <TextField fullWidth type="password" placeholder="••••••••" size="small" />
        </Box>

        <Divider />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" disableElevation sx={{ textTransform: 'none' }}>
            Update Password
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}