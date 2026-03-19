"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation"; 
import ProductCard from "@/src/app/components/listviewpage/components/ProductCard";

const ProductList = ({
  activeFilters = [],
  priceRange = [0, 5000],
  verifiedOnly = false,
  sortOption = "Featured",
  viewMode = "list",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from DB via API
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const url = categoryQuery 
          ? `/api/products?category=${categoryQuery}` 
          : `/api/products`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [categoryQuery]);

  const formatTitle = (text) => {
    if (!text) return "";
    return text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // 2. Client-side Filtering (for price, rating, and search)
  const filteredProducts = products.filter((product) => {
    const searchTerm = searchQuery ? searchQuery.trim().toLowerCase() : "";
    const productPrice = parseFloat(product.price);

    if (productPrice < priceRange[0] || productPrice > priceRange[1]) return false;
    if (verifiedOnly && product.rating < 4) return false;

    if (searchTerm) {
      const haystack = `${product.title} ${product.description}`.toLowerCase();
      if (!haystack.includes(searchTerm)) return false;
    }

    // Brand, Feature, and Rating Filters
  if (activeFilters.length > 0) {
    // Separate our filters into categories
    const ratingFilters = activeFilters.filter(f => f.includes("star")).map(f => parseInt(f));
    const otherFilters = activeFilters.filter(f => !f.includes("star"));

    // Check Ratings (if any are selected, product must match at least one)
    if (ratingFilters.length > 0) {
      const matchRating = ratingFilters.some(r => Math.floor(product.rating) === r);
      if (!matchRating) return false;
    }

    // Check Brands & Features (if any are selected, product must contain the string)
    // We check if the brand (title) or the description matches the filter string
    if (otherFilters.length > 0) {
      const haystack = `${product.title} ${product.description} ${product.category}`.toLowerCase();
      const matchOthers = otherFilters.some(filter => 
        haystack.includes(filter.toLowerCase())
      );
      if (!matchOthers) return false;
    }
  }

    return true;
  });

  // 3. Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "Newest") return new Date(b.createdAt) - new Date(a.createdAt);
    return (b.rating * 1000 + b.orders) - (a.rating * 1000 + a.orders);
  });

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textAlign: "left" }}>
        {categoryQuery ? formatTitle(categoryQuery) : "All Products"}
        <Typography component="span" sx={{ color: "text.secondary", ml: 1, fontSize: "14px" }}>
          ({sortedProducts.length} items found)
        </Typography>
      </Typography>

      {sortedProducts.length > 0 ? (
        <Box sx={{ 
          display: viewMode === "grid" ? "flex" : "block", 
          flexWrap: "wrap", 
          gap: viewMode === "grid" ? 1 : 0 
        }}>
          {sortedProducts.map((item, index) => (
            <Box
              key={item._id}
              onClick={() => router.push(`/detail/${item._id}`)}
              sx={{
                cursor: "pointer",
                flex: viewMode === "grid" ? { xs: "1 1 calc(50% - 8px)", md: "1 1 calc(33.333% - 8px)" } : "1 1 auto",
                maxWidth: viewMode === "grid" ? { xs: "calc(50% - 8px)", md: "calc(33.333% - 8px)" } : "100%",
              }}
            >
              <ProductCard product={item} viewMode={viewMode} isFirst={index === 0} />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography sx={{ mt: 4, color: "text.secondary" }}>No products match your filters.</Typography>
      )}
    </Box>
  );
};

export default ProductList;