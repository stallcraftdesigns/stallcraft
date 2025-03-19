"use client";

import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useState, useEffect } from "react";

const fallbackImages = [
  {
    "image": "https://storage.googleapis.com/stall-craft.firebasestorage.app/stall-craft/1741633223821_image1.jpeg?GoogleAccessId=firebase-adminsdk-fbsvc%40stall-craft.iam.gserviceaccount.com&Expires=16447017600&Signature=sTUszfqXIO%2BE9AdrN5G3g7bQeovrlmoDdoa8xM%2FQZIZ%2F8EluolyKrbUvVv%2F65LnRsToEdigRJYhrEm%2BD3nr%2FCrHlhM7p38mV%2B0JmWe4C7mHbbxwz%2FZ7mCHW8qOx6eOWoFwlXjB%2Bst2dVTFgUtvzfvG%2BODq%2FJSN%2FtkoSaGPJD%2BaTjpbVOLo8J6A2XGhiTBVB3cK%2FNfGIevVPO%2B2PYg%2BobFuAAmpYqkTy7LVJnqkJsqNYt4Q1JE8ennjyRweba%2BjjHENEfcHsdmwtgT2rYYpOld3Ti%2F47mk6DoO%2BID9fjtoG7%2Bd5fLkkhHpljJKz0otICp0fQB4fxDSzFITiB6PFbVkg%3D%3D",
  },
  {
    "image": "https://storage.googleapis.com/stall-craft.firebasestorage.app/stall-craft/1741187306289_5608737d-742e-44d6-a435-daf9e5f58f1f.jpeg?GoogleAccessId=firebase-adminsdk-fbsvc%40stall-craft.iam.gserviceaccount.com&Expires=16447017600&Signature=BhcfV5ZiyDC1O2Bhin5gF%2F%2F9%2F8OxmrGAQuy5l8JPVSRVG3zVcB0z7PPOWVgl1D0tr%2BJm6792UFnV6ISs8YOABDsJXkt7Rrp8C7smZeQLPCLuuRVAu2Gyy1bOOHS9AAPwWCtmTb9%2Fc6DkDQMh5wPjQcKRbe%2B8z94WpVs9obOhCRBB2ESJXidKovipvTGnHOaoFq0lLo5wumt189qMhtp7P5s0MHZkosS7c4OVLTm12k4UBkQOa9W8NIJmOdHnPNgcziJwU53GaLN%2Fk1n%2BW8gmxZYeWxRSbw95rwm41djBNYlVBTcyiFtywBvTpAVfAopD75gF4zAXqIT%2BjQHQt3FnaQ%3D%3D",
  },
  {
    "image": "https://storage.googleapis.com/stall-craft.firebasestorage.app/stall-craft/1741633223821_image1.jpeg?GoogleAccessId=firebase-adminsdk-fbsvc%40stall-craft.iam.gserviceaccount.com&Expires=16447017600&Signature=sTUszfqXIO%2BE9AdrN5G3g7bQeovrlmoDdoa8xM%2FQZIZ%2F8EluolyKrbUvVv%2F65LnRsToEdigRJYhrEm%2BD3nr%2FCrHlhM7p38mV%2B0JmWe4C7mHbbxwz%2FZ7mCHW8qOx6eOWoFwlXjB%2Bst2dVTFgUtvzfvG%2BODq%2FJSN%2FtkoSaGPJD%2BaTjpbVOLo8J6A2XGhiTBVB3cK%2FNfGIevVPO%2B2PYg%2BobFuAAmpYqkTy7LVJnqkJsqNYt4Q1JE8ennjyRweba%2BjjHENEfcHsdmwtgT2rYYpOld3Ti%2F47mk6DoO%2BID9fjtoG7%2Bd5fLkkhHpljJKz0otICp0fQB4fxDSzFITiB6PFbVkg%3D%3D",
  },
];

const Carousel = () => {
  const [carousel, setCarousel] = useState(fallbackImages); // Show fallback initially
  const [loading, setLoading] = useState(true);

  // Fetch carousel from API
  const fetchCarousel = async () => {
    try {
      const response = await fetch("/api/routes/home?status=active");
      const data = await response.json();
      if (data.data?.length) {
        setCarousel(data.data);
      }
    } catch (error) {
      console.error("Error fetching carousel:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarousel();
  }, []);

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
        modules={[Autoplay, Pagination, EffectFade]}
        pagination={{ clickable: true }}
        effect="fade"
        className="custom-swiper"
      >
        {carousel.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image.image}
              alt="Image not found"
              width={1920}
              height={780}
              style={{ width: "100%", height: "auto", minHeight: "30vh", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Carousel;