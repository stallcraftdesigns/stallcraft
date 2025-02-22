"use client";

import { Container, Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

const brandImages = [
  "https://dummyimage.com/200x100/FF6347/fff&text=Brand+1", // Tomato Red
  "https://dummyimage.com/200x100/4682B4/fff&text=Brand+2", // Steel Blue
  "https://dummyimage.com/200x100/32CD32/fff&text=Brand+3", // Lime Green
  "https://dummyimage.com/200x100/FFD700/fff&text=Brand+4", // Gold
  "https://dummyimage.com/200x100/FF69B4/fff&text=Brand+5", // Hot Pink
  "https://dummyimage.com/200x100/8A2BE2/fff&text=Brand+6", // Blue Violet
];


const Brands = () => {
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
        {brandImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Image
                src={image}
                alt={`Brand ${index + 1}`}
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
