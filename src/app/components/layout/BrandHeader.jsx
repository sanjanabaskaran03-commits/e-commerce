"use client";

import React, { useContext, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWishlist } from '@/src/app/context/WishlistContext';
import { ColorModeContext } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { sampleData } from '@/src/app/components/listviewpage/components/ProductList';
import {
  AppBar, Toolbar, Typography, Box, IconButton, InputBase,
  Button, Stack, MenuItem, Select, Container, Badge, Drawer, List, ListItem, Menu
} from '@mui/material';
import {
  Person, Chat, Favorite, ShoppingCart,
  WbSunny, DarkMode, ShoppingBag, Menu as MenuIcon, Logout
} from '@mui/icons-material';

const BrandHeader = () => {
  const themeMode = useContext(ColorModeContext);
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist(); 
  const router = useRouter();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('All category');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const isDark = themeMode.mode === 'dark';

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const wishlistCount = wishlistItems.length;
  const productCategories = useMemo(
    () => [...new Set(sampleData.map(item => item.category))],
    []
  );
  const categoryCards = useMemo(() => {
    return productCategories
      .map((category) => {
        const product = sampleData.find(item => item.category === category);
        return product ? { category, product } : null;
      })
      .filter(Boolean);
  }, [productCategories]);
  const searchSuggestions = useMemo(() => {
    const titles = sampleData.map(item => item.title);
    return [...new Set(titles)];
  }, []);
  const filteredSuggestions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    return searchSuggestions
      .filter(item => item.toLowerCase().includes(term))
      .slice(0, 6);
  }, [searchTerm, searchSuggestions]);

  const toCategoryLabel = (value) => {
    if (!value) return 'All category';
    const normalized = value.replace(/-/g, ' ').toLowerCase();
    const match = productCategories.find(c => c.toLowerCase() === normalized);
    return match || 'All category';
  };

  useEffect(() => {
    const term = searchParams.get('search') || '';
    const category = searchParams.get('category');
    setSearchTerm(term);
    setSearchCategory(toCategoryLabel(category));
  }, [searchParams]);

  useEffect(() => {
    setActiveSuggestion(-1);
  }, [searchTerm]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    const trimmed = searchTerm.trim();
    if (trimmed) params.set('search', trimmed);
    if (searchCategory && searchCategory !== 'All category') {
      params.set('category', searchCategory.toLowerCase().replace(/\s+/g, '-'));
    }
    const query = params.toString();
    router.push(query ? `/shop?${query}` : '/shop');
  };

  const handleProfileOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleProfileAction = (path) => {
    handleProfileClose();
    if (path) router.push(path);
  };

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
              <HeaderAction icon={<Person />} label="Profile" mobileHideLabel onClick={handleProfileOpen} />
           
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
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '44px',
                border: '2px solid',
                borderColor: '#0D6EFD',
                borderRadius: '8px',
                overflow: 'hidden',
                bgcolor: 'background.paper',
              }}
            >
              <InputBase
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (filteredSuggestions.length === 0) return;
                    setShowSuggestions(true);
                    setActiveSuggestion((prev) =>
                      prev >= filteredSuggestions.length - 1 ? 0 : prev + 1
                    );
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (filteredSuggestions.length === 0) return;
                    setShowSuggestions(true);
                    setActiveSuggestion((prev) =>
                      prev <= 0 ? filteredSuggestions.length - 1 : prev - 1
                    );
                  } else if (e.key === 'Enter') {
                    if (showSuggestions && activeSuggestion >= 0) {
                      const selected = filteredSuggestions[activeSuggestion];
                      if (selected) {
                        setSearchTerm(selected);
                        setShowSuggestions(false);
                        return;
                      }
                    }
                    handleSearch();
                  } else if (e.key === 'Escape') {
                    setShowSuggestions(false);
                  }
                }}
                inputProps={{ autoComplete: 'off' }}
                sx={{ ml: 2, flex: 1, fontSize: '0.95rem', color: 'text.primary' }}
              />
              <Select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                variant="standard"
                disableUnderline
                sx={{ width: 'auto', minWidth: '130px', px: 1, color: 'text.primary' }}
              >
                <MenuItem value="All category">All category</MenuItem>
                {productCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                disableElevation
                onClick={handleSearch}
                sx={{ height: '100%', borderRadius: 0, px: 4, bgcolor: '#0D6EFD', textTransform: 'none' }}
              >
                Search
              </Button>
            </Box>

            {showSuggestions && filteredSuggestions.length > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '46px',
                  left: 0,
                  right: 0,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '8px',
                  boxShadow: 2,
                  zIndex: 1200,
                }}
              >
                {filteredSuggestions.map((item, index) => (
                  <Box
                    key={item}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setSearchTerm(item);
                      setShowSuggestions(false);
                    }}
                    sx={{
                      px: 2,
                      py: 1,
                      cursor: 'pointer',
                      bgcolor: activeSuggestion === index ? 'action.hover' : 'transparent',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <Typography sx={{ fontSize: '0.9rem', color: 'text.primary' }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {showSuggestions && filteredSuggestions.length === 0 && searchCategory === 'All category' && !searchTerm.trim() && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '46px',
                  left: 0,
                  right: 0,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '8px',
                  boxShadow: 2,
                  zIndex: 1200,
                  p: 1,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 1,
                }}
              >
                {categoryCards.map(({ category, product }) => (
                  <Box
                    key={category}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      const slug = category.toLowerCase().replace(/\s+/g, '-');
                      setShowSuggestions(false);
                      router.push(`/shop?category=${slug}`);
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      p: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <Box sx={{ width: 36, height: 36, position: 'relative', flexShrink: 0 }}>
                      <Image
                        src={product.img}
                        alt={product.title}
                        fill
                        sizes="36px"
                        style={{ objectFit: 'contain' }}
                      />
                    </Box>
                    <Typography sx={{ fontSize: '0.9rem', color: 'text.primary' }}>
                      {category}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <HeaderAction icon={<Person />} label="Profile" onClick={handleProfileOpen} />
            <HeaderAction icon={<Chat />} label="Message" />
            
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

      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem disabled>Account holder: Guest</MenuItem>
        <MenuItem onClick={() => handleProfileAction('/history')}>Browsing history</MenuItem>
        <MenuItem onClick={() => handleProfileAction('/settings')}>Account settings</MenuItem>
        <MenuItem onClick={() => handleProfileAction('/logout')}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Logout fontSize="small" />
            <Typography>Logout</Typography>
          </Stack>
        </MenuItem>
      </Menu>

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
