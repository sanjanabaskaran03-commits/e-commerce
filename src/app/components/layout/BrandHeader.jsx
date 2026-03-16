"use client";

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWishlist } from '@/src/app/context/WishlistContext';
import { ColorModeContext } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import {
  AppBar, Toolbar, Typography, Box, IconButton, InputBase,
  Button, Stack, MenuItem, Select, Container, Badge, Drawer, List, ListItem
} from '@mui/material';
import {
  Person, Chat, Favorite, ShoppingCart,
  WbSunny, DarkMode, ShoppingBag, Menu as MenuIcon
} from '@mui/icons-material';

const BrandHeader = () => {
  const themeMode = useContext(ColorModeContext);
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist(); // Now works because of the Provider
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDark = themeMode.mode === 'dark';

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <AppBar 
      position="sticky" 
      color="inherit" 
      elevation={0} 
      sx={{ 
        top: 0,
        borderBottom: '1px solid', 
        borderColor: 'divider', 
        bgcolor: 'background.paper', 
        zIndex: 1100 ,
        backgroundImage: 'none',
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1280px', px: 2, margin: '0 auto' }}>
        <Toolbar disableGutters sx={{ flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', py: { xs: 1.5, md: 3 }, gap: { xs: 1, md: 4 } }}>
          
          <Stack direction="row" alignItems="center" sx={{ width: { xs: '100%', md: 'auto' }, justifyContent: 'space-between' }}>
            <Stack direction="row" alignItems="center">
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                <MenuIcon />
              </IconButton>

              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Box sx={{ bgcolor: '#0D6EFD', borderRadius: '8px', p: { xs: 0.5, md: 0.8 }, display: 'flex' }}>
                  <ShoppingBag sx={{ color: '#fff', fontSize: { xs: '1.4rem', md: '1.8rem' } }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#8CB7F5', display: { xs: 'none', md: 'block' }, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                  Brand
                </Typography>
              </Link>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ display: { xs: 'flex', md: 'none' } }}>
              <HeaderAction icon={<Person />} label="Profile" mobileHideLabel />
              {/* Mobile Wishlist Icon */}
              <HeaderAction icon={<Badge badgeContent={wishlistCount} color="error">
                <Favorite/>
              </Badge>} />
              
              <Link href="/cart" style={{ textDecoration: 'none' }}>
                <HeaderAction 
                  icon={
                    <Badge badgeContent={cartCount} color="error">
                      <ShoppingCart />
                    </Badge>
                  } 
                  label="Cart" 
                  mobileHideLabel
                />
              </Link>
              <IconButton onClick={themeMode.toggleColorMode}>
                {isDark ? <WbSunny sx={{ color: '#FFD700' }} /> : <DarkMode />}
              </IconButton>
            </Stack>
          </Stack>

          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              alignItems: 'center', 
              flex: 1, 
              maxWidth: '660px', 
              height: '44px', 
              border: '2px solid',
              borderColor: '#0D6EFD', 
              borderRadius: '8px', 
              overflow: 'hidden', 
              bgcolor: 'background.paper'
            }}
          >
            <InputBase 
              placeholder="Search" 
              sx={{ ml: 2, flex: 1, fontSize: '0.95rem', color: 'text.primary' }} 
            />
            <Select 
              defaultValue="All category" 
              variant="standard" 
              disableUnderline 
              sx={{ width: 'auto', minWidth: '130px', px: 1, color: 'text.primary' }}
            >
              <MenuItem value="All category">All category</MenuItem>
              <MenuItem value="Gadgets">Gadgets</MenuItem>
            </Select>
            <Button 
              variant="contained" 
              disableElevation 
              sx={{ height: '100%', borderRadius: 0, px: 4, bgcolor: '#0D6EFD', textTransform: 'none' }}
            >
              Search
            </Button>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <HeaderAction icon={<Person />} label="Profile" />
            <HeaderAction icon={<Chat />} label="Message" />
            
            {/* Desktop Wishlist */}
            <HeaderAction 
              icon={
                <Badge badgeContent={wishlistCount} color="error">
                  <Favorite />
                </Badge>
              } 
              label="Wishlist" 
            />

            <Link href="/cart" style={{ textDecoration: 'none' }}>
              <HeaderAction 
                icon={
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCart />
                  </Badge>
                } 
                label="My cart" 
              />
            </Link>
            <IconButton onClick={themeMode.toggleColorMode} size="small">
              {isDark ? <WbSunny fontSize="small" sx={{ color: '#FFD700' }} /> : <DarkMode fontSize="small" />}
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
          <List sx={{ pt: 2 }}>
            {[
              { text: 'Home', path: '/' },
              { text: 'Categories', path: '/list' }, 
              { text: 'Cart', path: '/cart' }
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <Button fullWidth onClick={() => router.push(item.path)} sx={{ justifyContent: 'flex-start', px: 3, py: 1.5, textTransform: 'none' }}>
                  {item.text}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

const HeaderAction = ({ icon, label, onClick, mobileHideLabel }) => (
  <Stack alignItems="center" onClick={onClick} sx={{ cursor: 'pointer', minWidth: { xs: 'auto', md: '60px' }, color: '#979797', '&:hover': { color: '#0D6EFD' } }}>
    {icon}
    <Typography variant="caption" sx={{ fontSize: '12px', mt: 0.5, display: mobileHideLabel ? { xs: 'none', md: 'block' } : 'block' }}>
      {label}
    </Typography>
  </Stack>
);

export default BrandHeader;