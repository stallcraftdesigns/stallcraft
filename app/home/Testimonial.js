"use client";

import { Container, Typography, Card, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState, useEffect } from "react";

const testimonial = [
  {
    name: "Rahul Kumar",
    message: "This service is fantastic! Highly recommended.",
  },
  {
    name: "Anurag Tyagi",
    message: "Amazing experience! Will use again.",
  },
  {
    name: "Sagar Kaushik",
    message: "Professional and efficient. Great service!",
  },
  {
    name: "Vikas Chaudhary",
    message: "Professional and efficient. Great service!",
  },
  {
    name: "Rekha Sirohi",
    message: "Professional and efficient. Great service!",
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch brands from API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/routes/brands?status=active");
      const data = await response.json();
      setTestimonials(data.data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <Box>
      <Container sx={{ py: 5, mt: 5, width: "100%", textAlign: "center" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          fontFamily="var(--font-syne)"
          gutterBottom
          mb={5}
        >
          What People Say
        </Typography>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000 }}
          navigation
          modules={[Autoplay, Navigation]}
          breakpoints={{
            600: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonial.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,
                  minHeight: 120,
                  mb: 1,
                  alignItems: "center",
                  textAlign: "center",
                  p: 3,
                  background: "radial-gradient(circle, rgba(239,242,193,1) 0%, rgba(218,250,247,0.9528186274509804) 100%)",
                }}
              >
                <Typography
                  variant="body1"
                  color="grey.800"
                  sx={{
                    fontSize: "1.4rem",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                    mb: 2,
                  }}
                >
                  “{testimonial.message}”
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  fontFamily="var(--font-syne)"
                >
                  {testimonial.name}
                </Typography>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Testimonials;
