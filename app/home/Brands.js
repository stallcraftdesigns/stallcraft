"use client";

import { Container, Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import { useState, useEffect } from "react";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch brands from API
  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/routes/brands?status=active");
      const data = await response.json();
      setBrands(data.data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Don't render anything if no brands
  if (!loading && brands.length === 0) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5, mb: 4 }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        sx={{ fontFamily: "var(--font-syne)", mb: 8 }}
      >
        Trusted by Leading Brands
      </Typography>
      <Swiper
        spaceBetween={10}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Image
                src={brand.image}
                alt={brand.title}
                width={250}
                height={100}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Brands;
