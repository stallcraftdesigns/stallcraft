"use client";

import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../public/assets/images/logo.png";

// Navigation Links
const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonial", href: "/testimonials" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  // Close drawer when screen size increases
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
          backdropFilter: "blur(10px)", // Blur effect
          color: "black",
          boxShadow: "none",
          px: { xs: 3, md: 8 },
          minHeight: "90px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // Subtle border
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-end", // Align nav items to the right
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Logo Component */}
          <Logo />

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: 4,
              alignItems: "center",
              mt: 3,
            }}
          >
            <NavLinks pathname={pathname} />
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { lg: "none" }, position: "absolute", right: 16 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Component */}
      <MobileMenu
        open={mobileOpen}
        onClose={handleDrawerToggle}
        pathname={pathname}
      />
    </>
  );
}

// Logo Component
const Logo = () => (
  <Box
    sx={{
      position: "absolute",
      left: { xs: 12, md: 0 }, // Adjust left position for responsiveness
      width: { xs: 170, md: 180 },
      height: { xs: 150, md: 160 },
      px: 2,
      mt: 14,
      py: 1,
      bgcolor: "white",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    }}
  >
    <Link href="/" passHref>
      <Image src={logo} alt="Logo" width={160} height={140} priority />
    </Link>
  </Box>
);

// Navigation Links Component with Hover Animation
const NavLinks = ({ pathname }) => (
  <Box sx={{ display: "flex", gap: 4 }}>
    {navItems.map((item) => (
      <Link
        key={item.label}
        href={item.href}
        style={{
          textDecoration: "none",
          fontSize: "1.1rem",
          fontWeight: "bold",
          color: pathname === item.href ? "#007bff" : "black",
          transition: "color 0.3s ease",
          fontFamily: "var(--font-syne)",
          position: "relative",
        }}
      >
        {item.label}
        {pathname === item.href && (
          <motion.div
            style={{
              position: "absolute",
              bottom: -4,
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "#007bff",
            }}
            layoutId="underline" // Animated underline
          />
        )}
      </Link>
    ))}
  </Box>
);

// Mobile Drawer Component with Animation
const MobileMenu = ({ open, onClose, pathname }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          zIndex: 1300,
        }}
      >
        <Drawer
          anchor="right"
          open={open}
          onClose={onClose}
          sx={{
            "& .MuiDrawer-paper": {
              width: 220,
              boxShadow: 3,
              bgcolor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
              backdropFilter: "blur(10px)", // Blur effect
            },
          }}
        >
          <Box sx={{ width: 220, display: "flex", flexDirection: "column" }}>
            {/* Close Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Navigation Links */}
            <List>
              {navItems.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    onClick={onClose}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: pathname === item.href ? "#007bff" : "black",
                      "&:hover": { bgcolor: "#f1f1f1" },
                    }}
                  >
                    {item.label}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </motion.div>
    )}
  </AnimatePresence>
);
