"use client";
import { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={showButton}>
      <Fab
        onClick={scrollToTop}
        color="primary"
        size="medium"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#5BC1BC",
          "&:hover": {
            backgroundColor: "#468C8A",
          },
          transition: "all 0.3s ease-in-out",
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: 35, color: "#fff" }} />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;
