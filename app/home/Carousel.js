"use client";

import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const carouselImages = [
  "https://dummyimage.com/1920x980/000/fff&text=Carousel+1",
  "https://dummyimage.com/1920x980/222/fff&text=Carousel+2",
  "https://dummyimage.com/1920x980/444/fff&text=Carousel+3",
];

const Carousel = () => {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
        position: "relative",
      }}
    >
      <Swiper
        autoplay={{ delay: 3000 }}
        loop
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        className="custom-swiper"
      >
        {carouselImages.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              width={1920}
              height={980}
              style={{ width: "100%", height: "90vh", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Carousel;