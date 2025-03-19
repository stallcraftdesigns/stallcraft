"use client";

import { Container, Typography, Box, Button, Breadcrumbs, Link, Grid } from "@mui/material";
import Layout from "../../../layout/layout";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import serviceBg from "@/public/assets/images/services.jpg";
import { motion } from "framer-motion";
import TopBar from "../../TopBar";


// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const portfolios = []
export default function ServiceDetailPage({ params }) {
  const { id } = use(params);

  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch brands from API
  // Fetch service by ID from API
  const fetchServiceById = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/routes/services/${id}`); // Use dynamic ID
      if (!response.ok) {
        throw new Error("Failed to fetch service");
      }
      const data = await response.json();
      setService(data.data || null);
    } catch (error) {
      console.error("Error fetching service:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (id) {
      fetchServiceById();
    }
  }, [id]); // Ensure effect runs when `id` changes


  if (!service) {
    return (
      <Layout title="Service Not Found">
        <Container sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h4" color="textPrimary" sx={{ mb: 3 }}>
            Service Not Found
          </Typography>
          <Button variant="contained" color="primary" href="/services">
            Back to Services
          </Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout title={service.title}>
      <TopBar />
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
          backgroundImage: `url(${serviceBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "var(--font-syne)",
        }}
      >
        <Box sx={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)" }} />

        <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: "var(--font-syne)" }}>
            {service.title}
          </Typography>
          <Breadcrumbs
            sx={{ color: "white", justifyContent: "center", display: "flex", mt: 1, fontFamily: "var(--font-syne)" }}
          >
            <Link href="/" underline="hover" color="inherit" sx={{ fontFamily: "var(--font-syne)" }}>
              Home
            </Link>
            <Link href="/services" underline="hover" color="inherit" sx={{ fontFamily: "var(--font-syne)" }}>
              Services
            </Link>
            <Typography color="white" sx={{ fontFamily: "var(--font-syne)" }}>
              {service.title}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Left Side: Title, Short Desc, Long Desc */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography fontSize={30} fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 3 }}>
                {service.title}
              </Typography>
              <Typography fontSize={20} color="textSecondary" sx={{ mb: 3, fontFamily: "var(--font-syne)" }}>
                {service.shortDescription}
              </Typography>

            </motion.div>
          </Grid>

          {/* Right Side: Image with Abnormal Design */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "400px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transform: "rotate(2deg)", // Abnormal design
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Image src={service.image} alt={service.title} fill />
              </Box>
            </motion.div>
          </Grid>
          <Typography fontSize={18} sx={{ mb: 3, mt: 8, fontFamily: "var(--font-syne)" }}>
            {service.longDescription?.split(". ").map((sentence, index, arr) => (
              <span key={index}>
                {sentence}
                {index < arr.length - 1 && <br />} {/* Add <br /> after each sentence except the last one */}
              </span>
            ))}
          </Typography>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.5 }}>
            <Button variant="contained" color="primary" href="/services">
              Back to Services
            </Button>
          </motion.div>
        </Grid>

        {/* Swiper Slider */}
        <Box sx={{ mt: 15 }}>
          <Swiper
            autoplay={{ delay: 3000 }}
            loop
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={30}
            className="custom-portfolio"
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ padding: "0 30px" }}
          >
            {portfolios.map((img, index) => (
              <SwiperSlide key={index}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Box
                    component="img"
                    src={img}
                    alt={`Portfolio ${index + 1}`}
                    width="100%"
                    height="auto"
                    borderRadius="8px"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Layout>
  );
}