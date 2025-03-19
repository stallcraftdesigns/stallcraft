"use client";

import { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Button, Box, Breadcrumbs, Link } from "@mui/material";
import Image from "next/image";
import Layout from "../../layout/layout";
import serviceBg from "@/public/assets/images/services.jpg";
import Brands from "../home/Brands";
import { motion } from "framer-motion";
import TopBar from "../TopBar";


// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardHover = {
  hover: {
    y: -10,
    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
    transition: { type: "spring", stiffness: 300 },
  },
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch brands from API
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/routes/services?status=active");
      const data = await response.json();
      setServices(data.data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Layout title="Services">
      <TopBar />
      {/* Hero Section with Animation */}
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
          backgroundImage: `url(${serviceBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "var(--font-syne)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: "var(--font-syne)" }}>
            Our Services
          </Typography>
          <Breadcrumbs
            sx={{
              color: "white",
              justifyContent: "center",
              display: "flex",
              mt: 1,
              fontFamily: "var(--font-syne)",
            }}
          >
            <Link href="/" underline="hover" color="inherit" sx={{ fontFamily: "var(--font-syne)" }}>
              Home
            </Link>
            <Typography color="white" sx={{ fontFamily: "var(--font-syne)" }}>
              Services
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* What We Provide Section */}
      <Container maxWidth="lg" sx={{ textAlign: "center", py: 6 }}>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible">
          <Typography fontSize={35} fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 3 }}>
            What We Provide
          </Typography>
          <Typography
            fontSize="20px"
            color="textSecondary"
            sx={{ fontFamily: "var(--font-syne)", maxWidth: "90%", margin: "0 auto" }}
          >
            StallCraft Designs specializes in providing premium exhibition and fair solutions, including custom-built stalls,
            country pavilions, interior and exterior designs, and mezzanine stands. Our expertise ensures that your
            brand stands out in any event, creating engaging experiences for visitors while optimizing space and
            functionality.
          </Typography>
        </motion.div>
      </Container>

      {/* Services Cards */}
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible">
          <Grid container spacing={4} justifyContent="center">
            {services.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <motion.div variants={fadeInUp} whileHover="hover">
                  <Card
                    sx={{
                      boxShadow: 4,
                      borderRadius: "12px",
                      transition: "0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                      overflow: "hidden",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%", // Ensure card takes full height
                      minHeight: 400,
                      variants:{cardHover}
                    }}
                  >
                    {/* Service Image */}
                    <Box sx={{ position: "relative", width: "100%", height: "200px" }}>
                      <Image src={service.image} alt="image" layout="fill" />
                    </Box>

                    {/* Card Content (Flexbox Applied) */}
                    <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ fontFamily: "var(--font-syne)", mb: 1 }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{ fontFamily: "var(--font-syne)", mb: 2, flexGrow: 1 }}
                      >
                        {service.desc}
                      </Typography>

                      {/* Wrapper to ensure button stays at the bottom */}
                      <Box sx={{ mt: "auto", pt: 2 }}>
                        <Link href={`/services/${service.id}`}>
                          <Button variant="contained" color="primary">
                            Know More
                          </Button>
                        </Link>
                      </Box>
                    </CardContent>
                  </Card>

                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Brands Section */}
      <Brands />
    </Layout>
  );
}