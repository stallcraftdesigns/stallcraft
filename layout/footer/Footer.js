"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import logo from "../../public/assets/images/logo.png";
import { Syne } from "next/font/google";

// Load Syne font
const syneFont = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#F8F9FA", // Light background
        color: "#333", // Dark grey text for readability
        py: 6,
        px: { xs: 4, md: 10 },
        fontFamily: "var(--font-syne)",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
      className={syneFont.variable}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Left: Logo & About */}
          <Grid item xs={12} md={3}>
            <Link href="/" underline="none">
              <Image src={logo} alt="Logo" width={180} height={160} />
            </Link>
            <Typography
              fontSize={18}
              sx={{ mt: 2, color: "#555", lineHeight: 1.6 }}
              fontFamily="var(--font-syne)"
            >
              From Concept to Reality – <br /> We Build, You Shine
            </Typography>
          </Grid>

          {/* Center: Quick Links */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 2, color: "#222" }}
              fontFamily="var(--font-syne)"
            >
              Quick Links
            </Typography>
            {[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: "Portfolio", href: "/portfolio" },
              { name: "Contact", href: "/contact" },
              { name: "Testimonials", href: "/testimonials" },
            ].map((item) => (
              <Typography
                key={item.name}
                fontSize={16}
                sx={{ mb: 1.5 }}
                fontFamily="var(--font-syne)"
              >
                <Link
                  href={item.href}
                  color="inherit"
                  underline="none"
                  sx={{
                    transition: "color 0.3s ease",
                    "&:hover": { color: "#007BFF" }, // Subtle blue hover
                  }}
                >
                  {item.name}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Center: Terms & Policies */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 2, color: "#222" }}
              fontFamily="var(--font-syne)"
            >
              Legal
            </Typography>
            {[
              { name: "Terms & Conditions", href: "/terms-and-conditions" },
              { name: "Privacy Policy", href: "/privacy-policy" },
            ].map((item) => (
              <Typography
                key={item.name}
                fontSize={16}
                sx={{ mb: 1.5 }}
                fontFamily="var(--font-syne)"
              >
                <Link
                  href={item.href}
                  color="inherit"
                  underline="none"
                  sx={{
                    transition: "color 0.3s ease",
                    "&:hover": { color: "#007BFF" },
                  }}
                >
                  {item.name}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Right: Social Links */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 2, color: "#222" }}
              fontFamily="var(--font-syne)"
            >
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {[
                { icon: FaFacebookF, color: "#1877F2", href: "https://www.facebook.com/share/1AZexmgig9/?mibextid=wwXIfr" },
                { icon: FaWhatsapp, color: "#25D366", href: "https://wa.me/919910954993" }, // Replace with actual number
                { icon: FaInstagram, color: "#E4405F", href: "https://www.instagram.com/stallcraftdesigns" },
              ].map(({ icon: Icon, href, color }, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: {color},
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: {color},
                      transform: "scale(1.3)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Icon size={24} />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, bgcolor: "rgba(0, 0, 0, 0.1)" }} />

        {/* Bottom: Copyright */}
        <Typography
          variant="body1"
          align="center"
          sx={{ color: "#666", fontSize: 18 }}
          fontFamily="var(--font-syne)"
        >
          &copy; {new Date().getFullYear()} StallCraft Designs. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}