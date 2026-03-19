"use client";

import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Link, Box, Typography, CircularProgress } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTheme } from '@mui/material/styles';
import { usePathname, useSearchParams, useParams } from 'next/navigation';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

const BreadcrumbSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams(); 

  // 1. State for the current product from DB
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const categoryQuery = searchParams.get('category');
  const productId = params?.id; // This is now a MongoDB String ID

  // 2. Fetch product info if we are on a detail page
  useEffect(() => {
    const fetchBreadcrumbData = async () => {
      if (productId && pathname.includes('/detail')) {
        try {
          setLoading(true);
          const res = await fetch(`/api/products/${productId}`);
          if (res.ok) {
            const data = await res.json();
            setCurrentProduct(data);
          }
        } catch (error) {
          console.error("Breadcrumb fetch error:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Reset if we leave the detail page
        setCurrentProduct(null);
      }
    };

    fetchBreadcrumbData();
  }, [productId, pathname]);

  const formatText = (text) => {
    if (!text) return "";
    return text
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

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
          {/* Always Home */}
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>

          {/* Shop Link */}
          {(pathname.includes('/shop') || pathname.includes('/detail')) && (
            <Link underline="hover" color="inherit" href="/shop">
              Shop
            </Link>
          )}

          {/* Dynamic Category Link */}
          {(categoryQuery || (currentProduct && currentProduct.category)) && (
            <Link 
              underline="hover" 
              color="inherit" 
              href={`/shop?category=${(categoryQuery || currentProduct?.category).toLowerCase().replace(/\s+/g, '-')}`}
            >
              {formatText(categoryQuery || currentProduct?.category)}
            </Link>
          )}

          {/* Current Product Title */}
          {currentProduct && (
            <Typography 
              sx={{  
                fontSize: { xs: '13px', md: '14px' },
                color: 'text.primary',
                fontWeight: 500
              }}
            >
              {currentProduct.title}
            </Typography>
          )}

          {/* Optional: Show loading indicator if fetching product title */}
          {loading && <CircularProgress size={14} sx={{ ml: 1 }} />}
        </Breadcrumbs>
      </Box>
    </LayoutContainer>
  );
};

export default BreadcrumbSection;