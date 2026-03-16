"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@mui/material';
import { useParams } from 'next/navigation'; // Added to get the ID
import {
  Box, Typography, Stack, Link, TableCell, TableBody, TableRow, TableContainer, Table
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

// Import your sampleData (Or paste the array from ProductList here)
import { sampleData } from '@/src/app/components/listviewpage/components/ProductList'; 

const Description = () => {
  const { id } = useParams(); // Get ID from /detail/[id]
  const [activeTab, setActiveTab] = useState('Description');
  const theme = useTheme();
const isDark = theme.palette.mode === 'dark';

  // Find the current product based on the URL ID
  const product = sampleData.find((p) => p.id === parseInt(id)) || sampleData[0];

  // Logic: "You may like" should show products from the SAME category, excluding current
  const relatedProducts = sampleData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5); // Take up to 5 items

  // Dynamic Specs based on product description/category
  const specs = [
    { label: 'Model', value: `#${1000 + product.id}XT` },
    { label: 'Category', value: product.category },
    { label: 'Features', value: product.description.split(',')[0] }, // Grab first part of desc
    { label: 'Rating', value: `${product.rating} Stars` },
    { label: 'Availability', value: 'In Stock' },
  ];

  return (
    <LayoutContainer>
      <Stack
        direction={{ md: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ mt: 3, display: { xs: 'none', md: "flex" } }}
      >
        <Stack sx={{ flex: 3 }}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '6px',
              overflow: 'hidden',
              bgcolor: 'background.paper',
            }}
          >
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
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {tab}
                  </Link>
                ))}
              </Stack>
            </Box>

            <Box sx={{ p: 3 }}>
              {/* DYNAMIC CONTENT */}
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                Detailed Information: {product.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
                The {product.title} is designed for users looking for {product.description}. 
                Experience the best in the {product.category} category with high-quality materials 
                and industry-leading performance.
              </Typography>

              <TableContainer
                component={Box}
                sx={{
                  maxWidth: 450,
                  mb: 3,
                  border: '1px solid',
                  borderColor: '#E0E7EE',
                  borderRadius: '4px',
                }}
              >
                <Table size="small">
                  <TableBody>
                    {specs.map((row, index) => (
                      <TableRow key={row.label}>
                        <TableCell sx={{ bgcolor: isDark ? '#505050' : '#eff2f4', width: 150, fontWeight: 500 }}>
                          {row.label}
                        </TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>
                          {row.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Key Highlights:</Typography>
                {[
                  `Premium ${product.category} quality`,
                  `Highly rated: ${product.rating}/5 by users`,
                  `Official warranty included`,
                  `Fast shipping on all orders`
                ].map((text, i) => (
                  <Stack key={i} direction="row" spacing={1} alignItems="center">
                    <CheckIcon sx={{ fontSize: 18, color: '#8B96A5' }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{text}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Box>
        </Stack>

        {/* RELATED PRODUCTS SIDEBAR */}
        <Stack sx={{ flex: 1, minWidth: 280 }}>
          <Box sx={{
            bgcolor: 'background.paper',
            borderRadius: '6px',
            border: '1px solid',
            borderColor: 'divider',
            p: 2,
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              More from {product.category}
            </Typography>
            <Stack spacing={2.5}>
              {relatedProducts.map((item) => (
                <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                  <Box sx={{ position: 'relative', width: 50, height: 50, border: '1px solid #eee', p: 0.5 }}>
                    <Image src={item.img} fill style={{ objectFit: 'contain' }} alt={item.title} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>{item.title}</Typography>
                    <Typography sx={{ color: '#8B96A5', fontSize: "13px" }}>${item.price}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </LayoutContainer>
  );
};

export default Description;