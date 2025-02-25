"use client";

import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";

const portfolioImages = [
  "https://dummyimage.com/500x300/6495ED/fff&text=Portfolio+1", // Cornflower Blue
  "https://dummyimage.com/500x300/FFB6C1/fff&text=Portfolio+2", // Light Pink
  "https://dummyimage.com/500x300/90EE90/fff&text=Portfolio+3", // Light Green
];


const Portfolio = () => {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
        position: "relative",
        bgcolor: "#FAF9F6",
        // py: 5,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        gutterBottom
        fontFamily="var(--font-syne)"
        mb={5}
        mt={5}
      >
        Our Portfolio
      </Typography>
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
        {portfolioImages.map((img, index) => (
          <SwiperSlide key={index}>
            <Link href="/portfolio">
              <Box
                component="img"
                src={img}
                alt={`Portfolio ${index + 1}`}
                width="100%"
                height="auto"
                borderRadius="8px"
                marginBottom={8}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Portfolio;
