"use client";

import { Box, IconButton, Tooltip } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";

const SocialPopup = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%", // Align to center
        right: 10,
        transform: "translateY(-50%)", // Adjust for exact centering
        display: "flex",
        flexDirection: "column",
        gap: 1, // Space between icons
        zIndex: 1000,
      }}
    >
      {[
        { icon: <InstagramIcon sx={{ fontSize: 25, }} />, color: "#E1306C", link: "https://www.instagram.com/stallcraftdesigns", label: "Instagram" },
        { icon: <FacebookIcon sx={{ fontSize: 25, }} />, color: "#4267B2", link: "https://www.facebook.com/share/1AZexmgig9/?mibextid=wwXIfr", label: "Facebook" },
        { icon: <WhatsAppIcon sx={{ fontSize: 25, }} />, color: "#25D366", link: "https://wa.me/919910954993", label: "WhatsApp" },
      ].map((item, index) => (
        <Tooltip key={index} title={item.label}>
          <IconButton
            component={Link}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: item.color,
              color: "#fff",
              width: 40,
              height: 40,
              boxShadow: 3,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                bgcolor: item.color,
              },
            }}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default SocialPopup;
