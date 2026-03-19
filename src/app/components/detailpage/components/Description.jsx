"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@mui/material';
import { useParams } from 'next/navigation';
import {
  Box, Typography, Stack, Link, TableCell, TableBody, TableRow, TableContainer, Table
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

const Description = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Description');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch('/api/products');
        const allData = await res.json();
        
        const current = allData.find((p) => p.id === Number(id)) || allData[0];
        setProduct(current);

        const related = allData
          .filter((p) => p.category === current.category && p.id !== current.id)
          .slice(0, 5);
        setRelatedProducts(related);
      } catch (err) {
        console.error("Failed to fetch product for description", err);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (!product) return null;

  const specs = [
    { label: 'Model', value: `#${1000 + product.id}XT` },
    { label: 'Style', value: 'Classic style' },
    { label: 'Certificate', value: 'ISO-898921212' },
    { label: 'Size', value: '34mm x 450mm x 19mm' },
    { label: 'Memory', value: '36GB RAM' },
  ];

  return (
    <LayoutContainer>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ mt: 3 }}
      >
        {/* Main Content (Left) */}
        <Stack sx={{ flex: 3, width: '100%' }}>
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '6px', overflow: 'hidden', bgcolor: 'background.paper' }}>
            <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 3 }}>
              <Stack direction="row" spacing={3}>
                {['Description', 'Reviews', 'Shipping', 'About seller'].map((tab) => (
                  <Link
                    key={tab}
                    component="button"
                    onClick={() => setActiveTab(tab)}
                    underline="none"
                    sx={{
                      py: 2,
                      fontSize: '16px',
                      fontWeight: 500,
                      color: activeTab === tab ? 'primary.main' : '#8B96A5',
                      borderBottom: activeTab === tab ? '2px solid' : 'none',
                      borderColor: 'primary.main',
                    }}
                  >
                    {tab}
                  </Link>
                ))}
              </Stack>
            </Box>

            <Box sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ color: 'text.primary', mb: 3, lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                nulla pariatur.
              </Typography>

              <TableContainer component={Box} sx={{ maxWidth: 450, mb: 3, border: '1px solid', borderColor: '#E0E7EE', borderRadius: '4px' }}>
                <Table size="small">
                  <TableBody>
                    {specs.map((row) => (
                      <TableRow key={row.label}>
                        <TableCell sx={{ bgcolor: isDark ? '#404040' : '#eff2f4', width: 150, fontWeight: 500, color: 'text.secondary' }}>{row.label}</TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Stack spacing={1}>
                {['Some great feature name here', 'Lorem ipsum dolor sit amet, consectetur', 'Duis aute irure dolor in reprehenderit', 'Some great feature name here'].map((text, i) => (
                  <Stack key={i} direction="row" spacing={1} alignItems="center">
                    <CheckIcon sx={{ fontSize: 18, color: '#8B96A5' }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{text}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Box>
        </Stack>

       {/* Sidebar (Right) - Exact Match to Image */}
<Stack 
  sx={{ 
    flex: 1, 
    minWidth: 280, 
    display: { xs: 'none', md: 'flex' } 
  }}
>
  <Box sx={{
    bgcolor: 'background.paper',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: 'divider',
    p: 2,
  }}>
    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
      You may like
    </Typography>
    
    <Stack spacing={2}>
      {/* If relatedProducts is empty, it will show nothing. 
          Ensure your /api/products returns data correctly. */}
      {relatedProducts.length > 0 ? (
        relatedProducts.map((item) => (
          <Stack key={item.id} direction="row" spacing={2} alignItems="center">
            <Box sx={{ 
              position: 'relative', 
              width: 80, // Slightly wider to match image proportions
              height: 80, 
              border: '1px solid #E0E7EE', 
              borderRadius: '6px', 
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Image 
                src={item.img} 
                width={60} 
                height={60} 
                style={{ objectFit: 'contain' }} 
                alt={item.title} 
              />
            </Box>
            <Box sx={{ textAlign: 'left' }}>
              <Typography sx={{ 
                fontSize: "14px", 
                fontWeight: 400, 
                color: '#1C1C1C', 
                lineHeight: 1.3,
                mb: 0.5
              }}>
                {item.title}
              </Typography>
              <Typography sx={{ color: '#8B96A5', fontSize: "13px" }}>
                $7.00 - $99.50
              </Typography>
            </Box>
          </Stack>
        ))
      ) : (
        /* Fallback if no related products found in database */
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          No similar items found.
        </Typography>
      )}
    </Stack>
  </Box>
</Stack>
      </Stack>
    </LayoutContainer>
  );
};

export default Description;