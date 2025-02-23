"use client";

import { Container, Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import { useState, useEffect } from "react";

const brandImages = [
  { id: 1, name: "Brand 1", image: "https://dummyimage.com/200x100/FF6347/fff&text=Brand+1" }, // Tomato Red
  { id: 2, name: "Brand 2", image: "https://dummyimage.com/200x100/4682B4/fff&text=Brand+2" }, // Steel Blue
  { id: 3, name: "Brand 3", image: "https://dummyimage.com/200x100/32CD32/fff&text=Brand+3" }, // Lime Green
  { id: 4, name: "Brand 4", image: "https://dummyimage.com/200x100/FFD700/fff&text=Brand+4" }, // Gold
  { id: 5, name: "Brand 5", image: "https://dummyimage.com/200x100/FF69B4/fff&text=Brand+5" }, // Hot Pink
  { id: 6, name: "Brand 6", image: "https://dummyimage.com/200x100/8A2BE2/fff&text=Brand+6" }, // Blue Violet
];

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
      {loading ? (
        <Typography textAlign="center">Loading brands...</Typography>
      ) : (
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
          {brandImages.map((brand, index) => (
            <SwiperSlide key={brand.id || index}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={250}
                  height={100}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Container>
  );
};

export default Brands;
