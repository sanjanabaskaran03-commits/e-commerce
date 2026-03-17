"use client";

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation'; 
import ProductCard from '@/src/app/components/listviewpage/components/ProductCard';

// Image Imports
import Iphone from '@/public/images/listviewpage/mobiles/mobile.png'
import Samsung from '@/public/images/listviewpage/mobiles/mobile2.png'
import Xiaomi from '@/public/images/listviewpage/mobiles/mobile3.png'
import Google from '@/public/images/listviewpage/mobiles/tab.png';
import Oneplus from '@/public/images/listviewpage/mobiles/Oneplus.jpg'

import Denim from '@/public/images/homepage/recommended_items/jerkin.png'
import Bikerjacket from '@/public/images/listviewpage/clothes/Biker jacket.jpg'
import Tshirt from '@/public/images/homepage/recommended_items/tshirt.png'
import Chinos from '@/public/images/listviewpage/clothes/chinos.jpg'
import Coats from '@/public/images/listviewpage/clothes/coats.jpg'

import MacBook from '@/public/images/listviewpage/computer/mackbook.jpg'
import Canon from '@/public/images/listviewpage/laptop.png'
import Dell from '@/public/images/listviewpage/computer/dell.jpg'
import Keyboard from '@/public/images/listviewpage/computer/keyboard.jpg'
import mouse from '@/public/images/listviewpage/computer/mouse.jpg'

import Sofa from '@/public/images/homepage/categories/soft chair.png'
import Table from '@/public/images/listviewpage/table.jpg'
import Lamp from '@/public/images/homepage/categories/lamp.png'
import Shelf from '@/public/images/listviewpage/shelf.jpg'
import Mattress from '@/public/images/homepage/categories/mattress.png' 

import Watch from '@/public/images/listviewpage/watch.png'
import Headphone from '@/public/images/listviewpage/headphone.png'
import Applewatch from '@/public/images/listviewpage/watch2.jpg'
import Bag from '@/public/images/listviewpage/bag.jpg'
import Headphone1 from '@/public/images/homepage/deals/headphone.png'

import Drill from '@/public/images/listviewpage/tools/drill set.jpg'
import Laser from '@/public/images/listviewpage/tools/laser.jpg'
import LaserMultimeter from '@/public/images/listviewpage/tools/multimeter.jpg'
import Socket from '@/public/images/listviewpage/tools/socket.jpg'
import Steel from '@/public/images/listviewpage/tools/steel.jpg'

import Backpack from '@/public/images/listviewpage/sports/backpack.jpg'
import Cycle from '@/public/images/listviewpage/sports/cycle.jpg'
import download from '@/public/images/listviewpage/sports/download.jpg'
import dumbbell from '@/public/images/listviewpage/sports/dumbbell.jpg'
import yogamat from '@/public/images/listviewpage/sports/yoga mat.jpg'

import Bed from '@/public/images/listviewpage/pets/bed.jpg'
import cage from '@/public/images/listviewpage/pets/cage.jpg'
import collar from '@/public/images/listviewpage/pets/collar.jpg'
import feeder from '@/public/images/listviewpage/pets/feeder.jpg'
import kit from '@/public/images/listviewpage/pets/kit.jpg'

import compressor from '@/public/images/listviewpage/machinery tools/compressor.jpg'
import concretemixer from '@/public/images/listviewpage/machinery tools/concrete mixer.jpg'
import floorjack from '@/public/images/listviewpage/machinery tools/floor jack.jpg'
import grinder from '@/public/images/listviewpage/machinery tools/grinder.jpg'
import welding from '@/public/images/listviewpage/machinery tools/welding.jpg'


export const sampleData = [
  { id: 1, title: 'iPhone 14 Pro Max', price: '1099.00', rating: 5, orders: 154, description: 'Plastic cover, Super power, iOS 16', img: Iphone, category: 'Mobiles' },
  { id: 2, title: 'Samsung S23 Ultra', price: '998.00', rating: 4, orders: 120, description: 'Metallic body, 8GB Ram, Large Memory', img: Samsung, category: 'Mobiles' },
  { id: 3, title: 'Xiaomi Redmi Note 12', price: '299.00', rating: 3, orders: 85, description: 'Plastic cover, Large Memory, Fast charging', img: Xiaomi, category: 'Mobiles' },
  { id: 4, title: 'Google Pixel 7', price: '599.00', rating: 4, orders: 60, description: 'Metallic finish, Super power camera', img: Google, category: 'Mobiles' },
  { id: 5, title: 'OnePlus 11 5G', price: '649.00', rating: 5, orders: 95, description: '8GB Ram, Metallic, Super power battery', img: Oneplus, category: 'Mobiles' },

  { id: 6, title: 'Men\'s Denim Jacket', price: '55.00', rating: 4, orders: 230, description: 'Classic blue denim, durable stitching', img:Denim, category: 'Clothes and wear' },
  { id: 7, title: 'Leather Biker Jacket', price: '120.00', rating: 5, orders: 45, description: 'Premium leather, metallic zippers', img: Bikerjacket, category: 'Clothes and wear' },
  { id: 8, title: 'Cotton Summer T-Shirt', price: '25.00', rating: 4, orders: 500, description: '100% Cotton, Breathable fabric', img: Tshirt, category: 'Clothes and wear' },
  { id: 9, title: 'Slim Fit Chinos', price: '40.00', rating: 3, orders: 150, description: 'Casual wear, multiple colors available', img:Chinos, category: 'Clothes and wear' },
  { id: 10, title: 'Woolen Winter Coat', price: '180.00', rating: 5, orders: 30, description: 'Heavy insulation, stylish winter wear', img:Coats, category: 'Clothes and wear' },

  { id: 11, title: 'MacBook Air M2', price: '1199.00', rating: 5, orders: 300, description: '8GB Ram, Metallic, Super power M2 chip', img: MacBook, category: 'Computer and tech' },
  { id: 12, title: 'Canon EOS R5', price: '3500.00', rating: 5, orders: 12, description: 'Professional tech, 8K video, Metallic', img:Canon, category: 'Computer and tech' },
  { id: 13, title: 'Dell XPS 13', price: '950.00', rating: 4, orders: 80, description: '8GB Ram, Metallic body, Windows 11', img: Dell, category: 'Computer and tech' },
  { id: 14, title: 'Mechanical Gaming Keyboard', price: '85.00', rating: 4, orders: 400, description: 'Metallic plate, RGB lighting, 8GB Ram storage', img: Keyboard, category: 'Computer and tech' },
  { id: 15, title: 'Logitech G-Pro Mouse', price: '120.00', rating: 5, orders: 600, description: 'Plastic cover, Lightweight, Modern tech', img: mouse, category: 'Computer and tech' },

  { id: 16, title: 'Modern Velvet Sofa', price: '850.00', rating: 5, orders: 40, description: 'Soft velvet, Metallic legs, Luxury', img: Sofa, category: 'Home interiors' },
  { id: 17, title: 'Wooden Dining Table', price: '450.00', rating: 4, orders: 20, description: 'Solid wood, fits 6 persons', img: Table, category: 'Home interiors' },
  { id: 18, title: 'Ceramic Table Lamp', price: '35.00', rating: 4, orders: 110, description: 'Plastic cover shade, Warm lighting', img: Lamp, category: 'Home interiors' },
  { id: 19, title: 'Minimalist Book Shelf', price: '120.00', rating: 3, orders: 55, description: 'Metallic frame, 5 tiers', img: Shelf, category: 'Home interiors' },
  { id: 20, title: 'Queen Size Bed Frame', price: '600.00', rating: 5, orders: 15, description: 'Super power durability, Metallic joints', img: Mattress, category: 'Home interiors' },

  { id: 21, title: 'Huawei Watch GT 3', price: '240.00', rating: 4, orders: 154, description: 'Metallic, Water resistant, Modern tech', img: Watch, category: 'Accessories' },
  { id: 22, title: 'Sony WH-1000XM5', price: '350.00', rating: 5, orders: 200, description: 'Plastic cover, Super power noise cancelling', img: Headphone, category: 'Accessories' },
  { id: 23, title: 'Apple Watch Series 8', price: '399.00', rating: 5, orders: 320, description: 'Metallic, Always-on display', img: Applewatch, category: 'Accessories' },
  { id: 24, title: 'Leather Travel Bag', price: '80.00', rating: 4, orders: 90, description: 'Large Memory space, Premium finish', img: Bag, category: 'Accessories' },
  { id: 25, title: 'Samsung Galaxy Buds 2', price: '120.00', rating: 4, orders: 450, description: 'Plastic cover, compact tech', img:Headphone1, category: 'Accessories' },

{ id: 26, title: 'Power Drill Set', price: '120.00', rating: 5, orders: 85, description: 'Professional, Electric, Heavy Duty, 18V battery', img: Drill, category: 'Tools and machinery' },
{ id: 27, title: 'Steel Wrench Kit', price: '45.00', rating: 4, orders: 120, description: 'Steel, Manual, Portable, 12-piece set', img: Steel, category: 'Tools and machinery' },
{ id: 28, title: 'Digital Multimeter', price: '35.00', rating: 4, orders: 65, description: 'Professional tech, Electric, Portable, Backlit display', img: LaserMultimeter, category: 'Tools and machinery' },
{ id: 29, title: 'Laser Level Tool', price: '85.00', rating: 5, orders: 40, description: 'Heavy Duty, Professional, Metallic, Self-leveling', img: Laser, category: 'Tools and machinery' },
{ id: 30, title: 'Socket Set Pro', price: '95.00', rating: 3, orders: 150, description: 'Steel, Heavy Duty, Manual, 40-piece kit', img: Socket, category: 'Tools and machinery' },

{ id: 31, title: 'Mountain Trail Bike', price: '550.00', rating: 5, orders: 25, description: 'Metallic, Heavy Duty, All-terrain tires', img: Cycle, category: 'Sports and outdoor' },
{ id: 32, title: 'Camping Tent 4-Person', price: '130.00', rating: 4, orders: 90, description: 'Waterproof, Portable, Lightweight, Minimalist design', img: download, category: 'Sports and outdoor' },
{ id: 33, title: 'Yoga Mat Premium', price: '40.00', rating: 5, orders: 300, description: 'Soft, Non-slip material, Eco-friendly', img: yogamat, category: 'Sports and outdoor' },
{ id: 34, title: 'Dumbbell Set 20kg', price: '75.00', rating: 4, orders: 110, description: 'Metallic, Heavy Duty, Professional gym gear', img: dumbbell, category: 'Sports and outdoor' },
{ id: 35, title: 'Waterproof Backpack', price: '65.00', rating: 4, orders: 200, description: 'Waterproof, Durable, New Arrival, Large capacity', img: Backpack, category: 'Sports and outdoor' },

{ id: 36, title: 'Orthopedic Dog Bed', price: '85.00', rating: 5, orders: 75, description: 'Soft, Memory foam, Washable cover, Luxury', img: Bed, category: 'Animal and pets' },
{ id: 37, title: 'Automatic Pet Feeder', price: '110.00', rating: 4, orders: 45, description: 'Modern tech, Plastic cover, Smart scheduling', img: feeder, category: 'Animal and pets' },
{ id: 38, title: 'Leather Cat Collar', price: '15.00', rating: 5, orders: 500, description: 'Leather, Metallic buckle, New Arrival', img: collar, category: 'Animal and pets' },
{ id: 39, title: 'Pet Grooming Kit', price: '45.00', rating: 4, orders: 130, description: 'Professional, Electric, Low noise tech', img: kit, category: 'Animal and pets' },
{ id: 40, title: 'Bird Cage Large', price: '140.00', rating: 3, orders: 20, description: 'Metallic, Heavy Duty, Spacious design', img: cage, category: 'Animal and pets' },

{ id: 41, title: 'Industrial Air Compressor', price: '450.00', rating: 5, orders: 15, description: 'Heavy Duty, Professional, Steel, Electric', img: compressor, category: 'Machinery tools' },
{ id: 42, title: 'Bench Grinder 8-Inch', price: '180.00', rating: 4, orders: 30, description: 'Metallic, Professional, Electric, High speed', img: grinder, category: 'Machinery tools' },
{ id: 43, title: 'Arc Welding Machine', price: '250.00', rating: 5, orders: 22, description: 'Professional, Steel, Electric, Portable', img: welding, category: 'Machinery tools' },
{ id: 44, title: 'Hydraulic Floor Jack', price: '95.00', rating: 4, orders: 85, description: 'Heavy Duty, Steel, Manual, 3-ton capacity', img: floorjack, category: 'Machinery tools' },
{ id: 45, title: 'Concrete Mixer Portable', price: '600.00', rating: 5, orders: 10, description: 'Steel, Heavy Duty, Electric, Professional', img: concretemixer, category: 'Machinery tools' }
];

const ProductList = ({
  activeFilters = [],
  priceRange = [0, 5000],
  verifiedOnly = false,
  sortOption = "Featured",
  viewMode = "list",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get('category');

  const formatTitle = (text) => {
    if (!text) return "";
    return text
      .replace(/-/g, ' ') 
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const isVerified = (product) => product.rating >= 4;
  const getFeaturedScore = (product) => product.rating * 1000 + product.orders;

  const filteredProducts = sampleData.filter(product => {
    const formattedQuery = categoryQuery ? categoryQuery.replace(/-/g, ' ') : null;

    const productPrice = parseFloat(product.price);
    if (productPrice < priceRange[0] || productPrice > priceRange[1]) {
      return false;
    }

    if (verifiedOnly && !isVerified(product)) {
      return false;
    }

    if (activeFilters.length > 0) {
      const ratingFilters = activeFilters.filter(f => f.includes("star")).map(f => parseInt(f));
      const otherFilters = activeFilters.filter(f => !f.includes("star")).map(f => f.toLowerCase());

      const matchesRating = ratingFilters.length > 0 
        ? ratingFilters.some(r => Math.floor(product.rating) === r) 
        : true;

      const matchesOther = otherFilters.length > 0 ? otherFilters.some(filter => 
        product.title.toLowerCase().includes(filter) || 
        product.description.toLowerCase().includes(filter) ||
        product.category.toLowerCase().includes(filter)
      ) : true;

      return matchesRating && matchesOther;
    }

    if (formattedQuery) {
      return product.category.toLowerCase() === formattedQuery.toLowerCase();
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "Newest") {
      return b.id - a.id;
    }
    return getFeaturedScore(b) - getFeaturedScore(a);
  });

  const isGrid = viewMode === "grid";

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textAlign: 'left' }}>
        {activeFilters.length > 0 
          ? "Filtered Products" 
          : (categoryQuery ? formatTitle(categoryQuery) : "All Products")
        } 
        
        <Typography component="span" sx={{ color: 'text.secondary', ml: 1, fontSize: '14px' }}>
          ({sortedProducts.length} items found)
        </Typography>
      </Typography>
      
      {sortedProducts.length > 0 ? (
        <Box
          sx={{
            display: isGrid ? 'grid' : 'block',
            gridTemplateColumns: isGrid ? { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } : 'none',
            gap: isGrid ? 2 : 0,
          }}
        >
          {sortedProducts.map(item => (
            <Box key={item.id} onClick={() => router.push(`/detail/${item.id}`)} sx={{ cursor: 'pointer' }}>
              <ProductCard product={item} viewMode={viewMode} />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography sx={{ mt: 4, color: 'text.secondary' }}>No products match your filters.</Typography>
      )}
    </Box>
  );
};

export default ProductList;
