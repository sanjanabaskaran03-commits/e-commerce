import React from 'react'
import RecommendedSection from '@/src/app/components/common/RecommendedSection';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

const RecommendedItems = () => {

  const recommendedData = [
    { price: "10.30", description: "T-shirts with multiple colors, for men", img: "/images/homepage/recommended_items/tshirt.png" },
    { price: "10.30", description: "Jeans shorts for men blue color", img: "/images/homepage/recommended_items/jerkin.png" },
    { price: "12.50", description: "Brown winter coat medium size", img: "/images/homepage/recommended_items/blazer.png" },
    { price: "34.00", description: "Jeans bag for travel for men", img: "/images/homepage/recommended_items/wallet.png" },
    { price: "99.00", description: "Leather wallet", img: "/images/homepage/recommended_items/bag.png" },
    { price: "9.99", description: "Canon camera black, 100x zoom", img: "/images/homepage/recommended_items/cloth.png" },
    { price: "8.99", description: "Headset for gaming with mic", img: "/images/homepage/recommended_items/headphone.png" },
    { price: "10.30", description: "Smartwatch silver color modern", img: "/images/homepage/recommended_items/bag.png" },
    { price: "10.30", description: "Blue wallet for men leather material", img: "/images/homepage/recommended_items/pot.png" },
    { price: "80.95", description: "Jeans bag for travel for men", img: "/images/homepage/recommended_items/coffee maker.png" },
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