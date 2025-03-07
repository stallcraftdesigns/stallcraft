"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import "../public/assets/css/preloader.css"; // Import CSS

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400); 
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null; // Hide when loading is complete

  return (
    <Box className="preloader">
      <Box className="preloader-content">
        <Box className="preloader-animation">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </Box>
      </Box>
    </Box>
  );
}
