"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; 
import { Box, Chip, Stack, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import BreadcrumbSection from "@/src/app/components/listviewpage/components/BreadCrumbSection";
import FilterSidebar from '@/src/app/components/listviewpage/components/FilterSidebar';
import PaginationSection from "@/src/app/components/listviewpage/components/PaginationSection";
import ProductListHeader from "@/src/app/components/listviewpage/components/ProductListHeader";
import ProductList from "@/src/app/components/listviewpage/components/ProductList";
import SubscribeSection from '@/src/app/components/layout/SubscribeSection';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

const ListContent = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortOption, setSortOption] = useState("Featured");
  const [viewMode, setViewMode] = useState("list");
  const searchParams = useSearchParams();

  // 1. Extract the category from the URL (?category=mobile-accessory)
  const category = searchParams.get('category');

  const handleFilterToggle = (filterName) => {
    setActiveFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((item) => item !== filterName)
        : [...prev, filterName]
    );
  };

  const clearAllFilters = () => setActiveFilters([]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 2 }}>
      <BreadcrumbSection />
      <LayoutContainer>
        <Box sx={{ display: 'flex', gap: 3, mt: 2, alignItems: 'flex-start' }}>
          
          <Box sx={{ width: 240, flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
            <FilterSidebar 
              activeFilters={activeFilters} 
              onFilterToggle={handleFilterToggle} 
            />
          </Box>

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            {/* 2. PASS THE CATEGORY HERE */}
            <ProductListHeader 
              category={category} 
              activeFilters={activeFilters} 
              onFilterToggle={handleFilterToggle} 
              verifiedOnly={verifiedOnly}
              onVerifiedChange={setVerifiedOnly}
              sortOption={sortOption}
              onSortChange={setSortOption}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            
            {activeFilters.length > 0 && (
              <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center" sx={{ mb: 2, mt: 1 }}>
                {activeFilters.map((filter) => (
                  <Chip
                    key={filter}
                    label={filter}
                    onDelete={() => handleFilterToggle(filter)}
                    deleteIcon={<CloseIcon style={{ fontSize: '16px' }} />}
                    variant="outlined"
                    sx={{ 
                      borderRadius: '5px', 
                      borderColor: '#0D6EFD', 
                      color: '#465166',
                      bgcolor: '#fff',
                      '& .MuiChip-label': { px: 1 }
                    }}
                  />
                ))}
                
                <Button 
                  variant="text" 
                  onClick={clearAllFilters}
                  sx={{ textTransform: 'none', color: '#0D6EFD', fontSize: '14px', ml: 1 }}
                >
                  Clear all filter
                </Button>
              </Stack>
            )}

            <Box sx={{ my: 2 }}>
              {/* 3. Also pass category to ProductList so you can filter your API results */}
              <ProductList
                category={category}
                activeFilters={activeFilters}
                verifiedOnly={verifiedOnly}
                sortOption={sortOption}
                viewMode={viewMode}
              />
            </Box>
            <PaginationSection />
          </Box>
        </Box>
      </LayoutContainer>
    </Box>
  );
};

const List = () => {
  return (
    <Suspense fallback={<Box sx={{ p: 5 }}>Loading products...</Box>}>
      <ListContent />
    </Suspense>
  );
};

export default List;
