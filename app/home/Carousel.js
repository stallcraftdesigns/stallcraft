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
    "image": "https://storage.googleapis.com/stall-craft.firebasestorage.app/stall-craft/1741189085713_2827abb3-989d-44e7-bbb4-6553d23a7774.jpeg?GoogleAccessId=firebase-adminsdk-fbsvc%40stall-craft.iam.gserviceaccount.com&Expires=16447017600&Signature=p8hjtFjqsuata7YHqHk7IKvZ7h9A9%2FaVJM6dJUklT3EzkuhoGTkgSWSJBPpcc9upO8aIYXsblY8f%2FCRZC%2FhexUHJ0aUgyuCLjVquFB60ZtQEoOx8ECh4VAeLOyCNcMxUHrcQXEvz%2Fh%2FgeRoha3z1PQKrlej50TMY%2F9QSIoWu1AHGBMwD4AfdOInWK4%2BWTpw5SSR59FNwgWBAIpvJ6GXBIibs0MZcg9JVT7GpDf%2BWlSZDB7yiwgFVqV0ExEbqdsVzvQwp%2Fk8K5S5rf458GBBtj1Lafb7MEfQs%2BBi754kBRfMyf536rbfG1YgWP2%2FBULC%2FEvxRxVRQp%2BslWsVX9sJj7Q%3D%3D",
  },
  {
    "image": "https://storage.googleapis.com/stall-craft.firebasestorage.app/stall-craft/1741187306289_5608737d-742e-44d6-a435-daf9e5f58f1f.jpeg?GoogleAccessId=firebase-adminsdk-fbsvc%40stall-craft.iam.gserviceaccount.com&Expires=16447017600&Signature=BhcfV5ZiyDC1O2Bhin5gF%2F%2F9%2F8OxmrGAQuy5l8JPVSRVG3zVcB0z7PPOWVgl1D0tr%2BJm6792UFnV6ISs8YOABDsJXkt7Rrp8C7smZeQLPCLuuRVAu2Gyy1bOOHS9AAPwWCtmTb9%2Fc6DkDQMh5wPjQcKRbe%2B8z94WpVs9obOhCRBB2ESJXidKovipvTGnHOaoFq0lLo5wumt189qMhtp7P5s0MHZkosS7c4OVLTm12k4UBkQOa9W8NIJmOdHnPNgcziJwU53GaLN%2Fk1n%2BW8gmxZYeWxRSbw95rwm41djBNYlVBTcyiFtywBvTpAVfAopD75gF4zAXqIT%2BjQHQt3FnaQ%3D%3D",
  },
  {
    "image": "https://storage.googleapis.com/stall-craft.firebasestorage.app/stall-craft/1741189085713_2827abb3-989d-44e7-bbb4-6553d23a7774.jpeg?GoogleAccessId=firebase-adminsdk-fbsvc%40stall-craft.iam.gserviceaccount.com&Expires=16447017600&Signature=p8hjtFjqsuata7YHqHk7IKvZ7h9A9%2FaVJM6dJUklT3EzkuhoGTkgSWSJBPpcc9upO8aIYXsblY8f%2FCRZC%2FhexUHJ0aUgyuCLjVquFB60ZtQEoOx8ECh4VAeLOyCNcMxUHrcQXEvz%2Fh%2FgeRoha3z1PQKrlej50TMY%2F9QSIoWu1AHGBMwD4AfdOInWK4%2BWTpw5SSR59FNwgWBAIpvJ6GXBIibs0MZcg9JVT7GpDf%2BWlSZDB7yiwgFVqV0ExEbqdsVzvQwp%2Fk8K5S5rf458GBBtj1Lafb7MEfQs%2BBi754kBRfMyf536rbfG1YgWP2%2FBULC%2FEvxRxVRQp%2BslWsVX9sJj7Q%3D%3D",
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