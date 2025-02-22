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
          bgcolor: "#fff",
          color: "black",
          boxShadow: "none",
          px: { xs: 3, md: 8 },
          minHeight: "90px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo Component */}
          <Logo />

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <NavLinks pathname={pathname} />
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
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
  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
    <Link href="/" passHref>
      <Image src={logo} alt="Logo" width={180} height={80} priority />
    </Link>
  </Box>
);

// Navigation Links Component
const NavLinks = ({ pathname }) => (
  <Box sx={{ display: "flex", gap: 4 }}>
    {navItems.map((item) => (
      <Link
        key={item.label}
        href={item.href}
        passHref
        style={{
          textDecoration: "none",
          fontSize: "1.1rem",
          fontWeight: "bold",
          color: pathname === item.href ? "#007bff" : "black",
          transition: "color 0.3s ease",
          fontFamily: "var(--font-syne)",
        }}
      >
        {item.label}
      </Link>
    ))}
  </Box>
);

// Mobile Drawer Component
const MobileMenu = ({ open, onClose, pathname }) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
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
);
