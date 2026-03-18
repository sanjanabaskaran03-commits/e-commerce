"use client";
import React from 'react'
import RecommendedSection from '@/src/app/components/common/RecommendedSection';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

const RecommendedItems = () => {

  const recommendedData = [
  { price: "10.30", description: "Men’s Polo Shirt", img: "/images/homepage/recommended_items/tshirt.png" },
  { price: "10.30", description: "Men’s Hooded Jacket", img: "/images/homepage/recommended_items/jerkin.png" },
  { price: "12.50", description: "Men’s Blazer", img: "/images/homepage/recommended_items/blazer.png" },
  { price: "34.00", description: "Blue Leather Wallet", img: "/images/homepage/recommended_items/wallet.png" },
  { price: "99.00", description: "Blue Backpack", img: "/images/homepage/recommended_items/bag.png" },
  { price: "9.99", description: "Denim Shorts", img: "/images/homepage/recommended_items/cloth.png" },
  { price: "8.99", description: "Over‑ear Headphones", img: "/images/homepage/recommended_items/headphone.png" },
  { price: "10.30", description: "Blue Backpack", img: "/images/homepage/recommended_items/bag.png" },
  { price: "10.30", description: "Clay Pot", img: "/images/homepage/recommended_items/pot.png" },
  { price: "80.95", description: "Electric Kettle", img: "/images/homepage/recommended_items/coffee maker.png" },
];


  return (
    <LayoutContainer>
      <RecommendedSection
        title="Recommended items"
        items={recommendedData}
      />
    </LayoutContainer>
  );
};

export default RecommendedItems;
