"use client";

import { CustomThemeProvider } from "@/src/app/context/ThemeContext";
import { CartProvider } from "@/src/app/context/CartContext";
import { CssBaseline } from "@mui/material";

export default function Providers({ children }) {
  return (
    <CustomThemeProvider>
      {/* CssBaseline resets CSS and applies the theme background color to the <body> */}
      <CssBaseline /> 
      <CartProvider>
        {children}
      </CartProvider>
    </CustomThemeProvider>
  );
}