"use client";

import React, { useState } from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BuildIcon from "@mui/icons-material/Build";
import ImageIcon from "@mui/icons-material/Image";
import CommentIcon from "@mui/icons-material/Comment";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? `${drawerWidth}px` : 0,
    fontFamily: "var(--font-syne)",
    overflowY: "auto",
    height: "calc(100vh - 64px)",
  })
);

export default function AdminLayout() {
  const pathname = usePathname(); // Get current path
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [open, setOpen] = useState(!isSmallScreen); // Default closed on small screens

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Services", icon: <BuildIcon />, path: "/admin/services" },
    { text: "Portfolio", icon: <ImageIcon />, path: "/admin/portfolio" },
    { text: "Testimonials", icon: <CommentIcon />, path: "/admin/testimonials" },
    { text: "Leads", icon: <PeopleIcon />, path: "/admin/leads" },
    { text: "Brands", icon: <StoreIcon />, path: "/admin/brands" },
    { text: "Logout", icon: <ExitToAppIcon />, path: "/admin/logout" },
  ];

  return (
    <>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#f8f9fa",
          color: "#333",
          boxShadow: "none",
          borderBottom: "1px solid #ddd",
          zIndex: 1201,
          fontFamily: "Syne, sans-serif",
        }}
      >
        <Toolbar>
          {isSmallScreen && (
            <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontFamily: "var(--font-syne)" }}>
            Admin Dashboard
          </Typography>
          <Button
            color="inherit"
            startIcon={<ExitToAppIcon />}
            component={Link}
            href="/admin/logout"
            sx={{ fontFamily: "var(--font-syne)" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            zIndex: 1200,
            fontFamily: "var(--font-syne)",
            height: "100vh",
            position: "fixed",
            padding: 2,
          },
        }}
      >
        <Toolbar />

        {/* Navigation */}
        <Box>
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path; // Check if item is active

            return (
              <Link key={index} href={item.path} passHref legacyBehavior>
                <Box
                  component="a"
                  onClick={() => isSmallScreen && toggleDrawer()} // Close sidebar on small screens
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    padding: "12px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    mb: 1,
                    color: isActive ? "blue" : "inherit", // Active item color
                    fontFamily: "var(--font-syne)",
                    fontWeight: "800",
                    backgroundColor: isActive ? "#e3f2fd" : "transparent", // Light blue background for active
                    "&:hover": { backgroundColor: "#f5f5f5", color: "blue" },
                  }}
                >
                  {item.icon}
                  <Typography variant="body1" fontSize="18px" fontWeight={500}>
                    {item.text}
                  </Typography>
                </Box>
              </Link>
            );
          })}
        </Box>
      </Drawer>
    </>
  );
}
