"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Cart on Load
useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/cart');
        const data = await res.json();

        // If your MongoDB returns a cart object with an items array
        if (data && data.items) {
          // Flatten the data: MongoDB usually stores { productId: {...}, qty: 1 }
          // We map it to match the format your UI expects
          const formattedItems = data.items.map(item => ({
            ...item.productId, // This spreads title, img, price from the populated Product
            qty: item.qty,
            _id: item.productId._id,
            id: item.productId._id // Ensure both id and _id exist
          }));
          
          setCartItems(formattedItems);
        }
      } catch (error) {
        console.error("Cart fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // 2. Update Quantity (MOVED OUTSIDE addToCart)
  const updateQuantity = async (productId, newQty) => {
    // Update Local State immediately for a snappy UI
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item.id === productId || item._id === productId || item.productId === productId) 
          ? { ...item, qty: newQty } 
          : item
      )
    );

    // Sync with MongoDB (Fixes the 405 error if your API has PATCH/PUT)
    try {
      await fetch('/api/cart', {
        method: 'PATCH', 
        body: JSON.stringify({ productId, qty: newQty }),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error("Failed to sync quantity:", error);
    }
  };

  // 3. Add to Cart
  const addToCart = async (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id || item._id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          (item.id === product.id || item._id === product.id) ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    try {
      await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId: product.id, action: 'add' }),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error("Failed to sync cart:", error);
    }
  };

  // 4. Remove from Cart
  const removeFromCart = async (id) => {
    setCartItems((prev) => prev.filter(item => (item.id !== id && item._id !== id)));
    try {
      await fetch(`/api/cart?id=${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, // <--- CRITICAL: This was missing from value
      loading 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);