"use client";
import React, { useEffect, useState } from "react";
import RecommendedSection from "@/src/app/components/common/RecommendedSection";
import LayoutContainer from "@/src/app/components/common/LayoutContainer";

const RecommendedItems = () => {
  const [recommendedData, setRecommendedData] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await fetch("/api/recommended");

        if (!res.ok) throw new Error("Failed to load recommended");

        const data = await res.json();

        console.log("API DATA:", data); // ✅ DEBUG

        const formatted = data.map((item) => ({
          img: item.image, // must match DB
          price: Number(item.price).toFixed(2), // safe conversion
          description: item.title || item.description,
        }));

        setRecommendedData(formatted);
      } catch (err) {
        console.error("Error fetching recommended:", err);
      }
    };

    fetchRecommended();
  }, []);

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