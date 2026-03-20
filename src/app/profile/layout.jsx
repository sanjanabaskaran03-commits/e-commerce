"use client";
import React from 'react';
import { 
  Box, Typography, List, ListItemButton, 
  ListItemIcon, ListItemText, Paper, Divider 
} from '@mui/material';
import { 
  Person, ShoppingBag, LocationOn, 
  ChevronRight, Security 
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

export default function ProfileLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { text: 'Personal Info', icon: <Person fontSize="small" />, path: '/profile' },
    { text: 'My Orders', icon: <ShoppingBag fontSize="small" />, path: '/profile/orders' },
    { text: 'Addresses', icon: <LocationOn fontSize="small" />, path: '/profile/address' },
    { text: 'Security', icon: <Security fontSize="small" />, path: '/profile/security' },
  ];

  return (
    <LayoutContainer>
      <Box sx={{ py: { xs: 3, md: 6 } }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, color: 'text.primary' }}>
          My Account
        </Typography>
        
        {/* Main Flex Wrapper */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 3 
        }}>
          
          {/* Sidebar Navigation (Fixed width on desktop) */}
          <Box sx={{ width: { xs: '100%', md: '280px' }, flexShrink: 0 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: '8px', 
                bgcolor: 'background.paper',
                overflow: 'hidden'
              }}
            >
              <List sx={{ p: 0 }}>
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.path;
                  return (
                    <React.Fragment key={item.text}>
                      <ListItemButton 
                        onClick={() => router.push(item.path)}
                        selected={isActive}
                        sx={{
                          py: 1.8,
                          '&.Mui-selected': {
                            bgcolor: 'action.selected',
                            borderLeft: '3px solid #0D6EFD',
                            '& .MuiListItemIcon-root': { color: 'primary.main' },
                            '& .MuiListItemText-primary': { fontWeight: 600, color: 'primary.main' }
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 35, color: 'text.secondary' }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.text} 
                          primaryTypographyProps={{ fontSize: '14px' }} 
                        />
                        <ChevronRight sx={{ fontSize: '16px', color: 'divider' }} />
                      </ListItemButton>
                      {index !== menuItems.length - 1 && <Divider />}
                    </React.Fragment>
                  );
                })}
              </List>
            </Paper>
          </Box>

          {/* Dynamic Content Window (Fills remaining space) */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2, md: 4 }, 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: '8px', 
                bgcolor: 'background.paper',
                minHeight: '500px'
              }}
            >
              {children}
            </Paper>
          </Box>
        </Box>
      </Box>
    </LayoutContainer>
  );
}