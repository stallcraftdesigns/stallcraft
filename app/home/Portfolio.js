"use client";

import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { useState, useEffect } from "react";

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch portfolios from API
  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/routes/portfolio?status=active");
      const data = await response.json();
      setPortfolios((data.data || []).slice(0, 5)); // Only take the first 5 items
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
        position: "relative",
        bgcolor: "#FAF9F6",
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
        {portfolios.map((portfolio) => (
          <SwiperSlide key={portfolio.id}>
            <Link href={`/portfolio/${portfolio.id}`}>
              <Box
                component="img"
                src={portfolio.image} // Use image field from API
                alt={portfolio.name} // Use name field for alt text
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
