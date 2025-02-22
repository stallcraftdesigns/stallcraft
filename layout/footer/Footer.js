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
      }}
      className={syneFont.variable}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Left: Logo & About */}
          <Grid item xs={12} md={3}>
            <Link href="/" underline="none">
              <Image src={logo} alt="Logo" width={180} height={90} />
            </Link>
            <Typography
              fontSize={20}
              sx={{ mt: 2, color: "#555" }}
              fontFamily="var(--font-syne)"
            >
              Elevating digital experiences with innovative design and
              technology.
            </Typography>
          </Grid>

          {/* Center: Quick Links */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ mb: 2 }}
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
                fontSize={18}
                sx={{ mb: 1 }}
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
              variant="h5"
              fontWeight="bold"
              sx={{ mb: 2 }}
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
                fontSize={18}
                sx={{ mb: 1 }}
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
              sx={{ mb: 2 }}
              fontFamily="var(--font-syne)"
            >
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[
                { icon: FaFacebookF, href: "https://facebook.com" },
                { icon: FaWhatsapp, href: "https://wa.me/919910954993" },
                { icon: FaInstagram, href: "https://instagram.com" },
              ].map(({ icon: Icon, href }, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={href}
                  target="_blank"
                  sx={{
                    bgcolor: "rgba(0, 123, 255, 0.1)",
                    color: "#333",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#007BFF",
                      color: "#fff",
                      boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.4)",
                    },
                  }}
                >
                  <Icon size={20} />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, bgcolor: "rgba(0, 0, 0, 0.1)" }} />

        {/* Bottom: Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#666" }}
          fontFamily="var(--font-syne)"
        >
          &copy; {new Date().getFullYear()} Stall Craft. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
