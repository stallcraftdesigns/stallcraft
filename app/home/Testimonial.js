"use client";

import { Container, Typography, Card, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    image: "https://dummyimage.com/200x200/FF4500/fff&text=User+1", // Orange Red
    name: "John Doe",
    message: "This service is fantastic! Highly recommended.",
  },
  {
    image: "https://dummyimage.com/200x200/1E90FF/fff&text=User+2", // Dodger Blue
    name: "Jane Smith",
    message: "Amazing experience! Will use again.",
  },
  {
    image: "https://dummyimage.com/200x200/32CD32/fff&text=User+3", // Lime Green
    name: "Alice Johnson",
    message: "Professional and efficient. Great service!",
  },
];

const Testimonials = () => {
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
            1024: { slidesPerView: 2 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  borderRadius: 3,
                  boxShadow: 3,
                  minHeight: 250,
                  mb: 1,
                  alignItems: "center",
                  textAlign: "center",
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={200}
                    height={150}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="grey.800"
                    sx={{
                      fontSize: "1.2rem",
                      fontStyle: "italic",
                      lineHeight: 1.6,
                      mb: 2,
                    }}
                  >
                    "{testimonial.message}"
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    fontFamily="var(--font-syne)"
                  >
                    {testimonial.name}
                  </Typography>
                </Box>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Testimonials;
