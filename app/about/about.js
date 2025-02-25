"use client";

import { Box, Button, Container, Grid, Typography, Link, Breadcrumbs } from "@mui/material";
import Layout from "../../layout/layout";
import Image from "next/image";
import aboutBg from "@/public/assets/images/about.jpg";
import visionImg from "@/public/assets/images/vision.png";
import Brands from "../home/Brands";
import { motion } from "framer-motion";

export default function About() {
  return (
    <Layout title="About Us">
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          backgroundImage: `url(${aboutBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "var(--font-syne)",
        }}
      >
        <Box sx={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)" }} />
        <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: "var(--font-syne)" }}>
            About
          </Typography>
          <Breadcrumbs sx={{ color: "white", justifyContent: "center", display: "flex", mt: 1, fontFamily: "var(--font-syne)" }}>
            <Link href="/" underline="hover" color="inherit" sx={{ fontFamily: "var(--font-syne)" }}>
              Home
            </Link>
            <Typography color="white" sx={{ fontFamily: "var(--font-syne)" }}>
              About us
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Who We Are Section */}
      <Container maxWidth="lg" sx={{ textAlign: "center", py: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Container maxWidth="lg">
            <Typography fontSize={35} fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 3 }}>
              Who We Are
            </Typography>
            <Typography fontSize="20px" color="textSecondary" sx={{ fontFamily: "var(--font-syne)", maxWidth: "100%", margin: "0 auto" }}>
              StallCraft Designs is a leading, dynamic provider of customized exhibition solutions, offering a diverse range of services tailored for the global exhibition industry. With an expert team of creative designers and skilled professionals, we transform ideas into reality with precision and innovation. Our strength lies in creating unique, standout exhibition stands that help brands make an impact at trade shows and events worldwide. From concept to execution, we offer high-quality, cost-effective services that exceed client expectations. Whether for international or local exhibitions, StallCraft Designs ensures your brand stands out with impressive and engaging designs.
            </Typography>
          </Container>
        </motion.div>
      </Container>

      {/* Our Vision Section - Responsive Layout */}
      <Box sx={{ width: "100%", py: 10, display: "flex", alignItems: "center" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Image first on small screens, second on large */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                order: { xs: 1, md: 2 }, // Image first on small screens, second on large
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={visionImg}
                  alt="Our Vision"
                  width="auto"
                  height="auto"
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "auto",
                    borderRadius: "10px",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                />
              </motion.div>
            </Grid>

            {/* Text second on small screens, first on large */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{ order: { xs: 2, md: 1 } }} // Text below image on small screens
            >
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography fontSize={35} fontWeight="bold" sx={{ fontFamily: "Syne, sans-serif", mb: 4 }}>
                  Our Vision
                </Typography>
                <Typography variant="h6" sx={{ color: "grey.700", fontFamily: "Syne, sans-serif", mb: 5 }}>
                  At StallCraft Designs, our vision is to lead the exhibition design industry with innovative and impactful solutions. We aim to create exceptional spaces that reflect our clients’ brand identity while fostering meaningful connections. By embracing cutting-edge design trends and technology, we strive to deliver memorable experiences at exhibitions and trade shows worldwide.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* More Section */}
      <Box
        sx={{
          width: "100%",
          py: 10,
          textAlign: "center",
          background: "linear-gradient(135deg, #f0f4f8, #e0e6f0)", // Gradient background
          color: "black",
          transition: "background 0.3s ease", // Added transition effect for background
          animation: "fadeIn 1s ease-in-out", // Animation for whole section
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                fontFamily: "Syne, sans-serif",
                mb: 3,
                fontSize: { xs: "1.5rem", sm: "2rem" }, // Responsive font size
              }}
            >
              Ready to Take Your Brand to the Next Level?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Syne, sans-serif",
                mb: 4,
                fontSize: { xs: "1rem", sm: "1.25rem" }, // Responsive font size
                color: "rgba(0, 0, 0, 0.7)", // Lighter text color
              }}
            >
              Join us in creating something extraordinary for your next exhibition or event.
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                variant="contained"
                size="large"
                color="primary"
                sx={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: "bold",
                  boxShadow: "0 4px 10px rgba(0, 123, 255, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(0, 123, 255, 0.5)",
                  },
                }}
                onClick={() => window.location.href = "/contact"}
              >
                Get in Touch
              </Button>
            </motion.div>
          </Container>
        </motion.div>
      </Box>

      <Brands />
    </Layout>
  );
}