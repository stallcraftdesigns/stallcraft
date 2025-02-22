"use client";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Syne } from "next/font/google";
import { Box } from "@mui/material";
import "../public/assets/css/global.css"

// Load the Syne font
const syneFont = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

export default function Layout({ children }) {
  return (
    <Box
      className={syneFont.variable}
      sx={{
        fontFamily: "var(--font-syne)",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Header at the top */}
      <Header />

      {/* Main content now takes full width */}
      <Box component="main" sx={{ flex: 1, width: "100%" }}>
        {children}
      </Box>

      {/* Footer at the bottom */}
      <Footer />
    </Box>
  );
}
