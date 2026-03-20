import React from 'react';
import { Typography, Box } from '@mui/material';

// 1. Make sure the function is defined
const OrdersPage = () => {
  return (
    <Box>
      <Typography variant="h6">My Orders</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        You haven't placed any orders yet.
      </Typography>
    </Box>
  );
};

// 2. CRITICAL: You must have this exact line at the bottom
export default OrdersPage;