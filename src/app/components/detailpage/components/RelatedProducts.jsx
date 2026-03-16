"use client"
import React from 'react';
import Image from 'next/image';
import {
  Box, Typography, Stack, useTheme
} from '@mui/material';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';
import Wallet from '@/public/images/homepage/recommended_items/wallet.png';
import Smartwatch from '@/public/images/homepage/deals/watch.png';
import Headphone from '@/public/images/homepage/recommended_items/headphone.png'; 
import Poco from '@/public/images/homepage/categories/tab.png';
import Canon from '@/public/images/homepage/deals/camera.png';
import Watch from '@/public/images/homepage/deals/phone.png';

const RelatedProducts = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const borderColor = theme.palette.divider;

  const productsArray = [
    { id: 1, title: 'Wallet', price: '$32.00-$40.00', img: Wallet },
    { id: 2, title: 'Smart watch', price: '$32.00-$40.00', img: Smartwatch },
    { id: 3, title: 'Headphone', price: '$32.00-$40.00', img: Headphone },
    { id: 4, title: 'Poco X5 Pro 5G', price: '$32.00-$40.00', img: Poco },
    { id: 5, title: 'Canon Camera', price: '$32.00-$40.00', img: Canon },
    { id: 6, title: "Huawei Watch ", price: '$32.00-$40.00', img: Watch }
  ];

  return (
    <LayoutContainer>
      <Box
        sx={{
          p: 3,
          borderRadius: '6px',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: borderColor,
          mt: 3
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary', textAlign: 'left' }}>
          Related products
        </Typography>

        <Stack 
          direction="row" 
          spacing={2}
          flexWrap="nowrap"
          sx={{ 
            justifyContent: { md: 'space-between' },
            overflowX: 'auto', 
            pb: { xs: 2, md: 0 }, 
            '&::-webkit-scrollbar': { 
              height: '4px',
              display: { xs: 'block', md: 'none' } 
            },
            '&::-webkit-scrollbar-thumb': { 
              bgcolor: 'divider', 
              borderRadius: '10px' 
            },
            '&:hover::-webkit-scrollbar': {
              display: 'block'
            }
          }}
        >
          {productsArray.map((item) => (
            <Stack 
              key={item.id} 
              direction="column" 
              alignItems="flex-start"
              sx={{ 
                flex: { xs: '0 0 auto', md: '1 1 auto' }, 
                minWidth: { xs: '140px', md: '120px' },
                maxWidth: { md: '180px' }, 
                cursor: 'pointer'
              }}
            >
              <Box 
                sx={{
                  position:'relative',
                  width: '100%', 
                  height: { xs: 140, md: 160 },
                  borderRadius: '4px',
                  border: '1px solid',
                  borderColor: borderColor,
                  p: 1,
                  objectFit: 'contain',
                  bgcolor: isDark ? 'white' : 'transparent' ,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 140px, 180px"
                  style={{ objectFit: 'contain', padding: '8px' }}
                />
                </Box>
              <Box sx={{ width: '100%' }}>
                <Typography 
                  sx={{ 
                    color: 'text.primary', 
                    fontWeight: 400, 
                    lineHeight: 1.2, 
                    fontSize: "14px", 
                    textAlign: 'left', 
                    mt: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal'
                  }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ color: '#8B96A5', mt: 0.5, textAlign: "left", fontSize: "14px" }}>
                  {item.price}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </LayoutContainer>
  );
};

export default RelatedProducts;