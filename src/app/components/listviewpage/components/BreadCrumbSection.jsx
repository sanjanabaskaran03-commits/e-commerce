"use client";

import React from 'react';
import { Breadcrumbs, Link, Box, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTheme } from '@mui/material/styles';
import { usePathname, useSearchParams, useParams } from 'next/navigation';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';
import { sampleData } from '@/src/app/components/listviewpage/components/ProductList'; 

const BreadcrumbSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams(); 

  const categoryQuery = searchParams.get('category');
  
  const formatText = (text) => {
    if (!text) return "";
    return text
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const productId = params?.id;
  const currentProduct = productId 
    ? sampleData.find(p => p.id === parseInt(productId)) 
    : null;

  return (
    <LayoutContainer>
      <Box 
        sx={{ 
          py: { xs: 1.5, md: 2 },
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Breadcrumbs 
          separator={<NavigateNextIcon sx={{ fontSize: { xs: '16px', md: '20px' }, color: "#8B96A5" }} />} 
          aria-label="breadcrumb"
          sx={{ 
            '& .MuiBreadcrumbs-li': { 
              fontSize: { xs: '13px', md: '14px' }, 
              color: isDark ? '#fff' : '#8B96A5' 
            } 
          }}
        >
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>

          {(pathname.includes('/shop') || pathname.includes('/detail')) && (
            <Link underline="hover" color="inherit" href="/shop">
              Shop
            </Link>
          )}

          {(categoryQuery || currentProduct) && (
            <Link 
              underline="hover" 
              color="inherit" 
              href={`/shop?category=${(categoryQuery || currentProduct?.category).toLowerCase().replace(/\s+/g, '-')}`}
            >
              {formatText(categoryQuery || currentProduct?.category)}
            </Link>
          )}

          {currentProduct && (
            <Typography 
              sx={{  
                fontSize: { xs: '13px', md: '14px' },
                color: 'inherit' 
              }}
            >
              {currentProduct.title}
            </Typography>
          )}
        </Breadcrumbs>
      </Box>
    </LayoutContainer>
  );
};

export default BreadcrumbSection;