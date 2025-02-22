"use client";

import { usePathname } from "next/navigation";
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import { Syne } from "next/font/google";
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme"; // Import the theme

// Load the Syne font
const syneFont = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

export default function Layout({ children }) {
  const pathname = usePathname(); // Get the current route
  const isSmallScreen = useMediaQuery("(max-width:900px)"); // ✅ Runs only on client

  // Hide Header & Footer on admin/login & admin/logout
  const hideHeaderFooter = pathname === "/admin/login" || pathname === "/admin/logout";

  return (
    <ThemeProvider theme={theme}>
      <Box
        className={syneFont.variable}
        sx={{
          fontFamily: "var(--font-syne), 'Syne', sans-serif",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {!hideHeaderFooter && <Header />}
        <Box
          sx={{
            marginTop: hideHeaderFooter ? 0 : "64px",
            fontFamily: "var(--font-syne), 'Syne', sans-serif",
            marginLeft: hideHeaderFooter ? 0 : isSmallScreen ? 0 : "240px",
            transition: "margin-left 0.3s ease",
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>
        {!hideHeaderFooter && (
          <Box sx={{ marginLeft: isSmallScreen ? 0 : "240px" }}>
            <Footer />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
