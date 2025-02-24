"use client";

import { Container, Typography, Box, Button, Breadcrumbs, Link, Grid } from "@mui/material";
import Layout from "../../../layout/layout";
import Image from "next/image";
import { use } from "react";
import serviceBg from "@/public/assets/images/services.jpg";
import { motion, AnimatePresence } from "framer-motion";

// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Dummy Data (replace with actual data)
const services = [
  {
    id: 1,
    title: "Custom Stands",
    desc: "Tailor-made exhibition stands designed to reflect your brand identity and maximize visitor engagement.",
    image: "https://dummyimage.com/500x350/007bff/fff&text=Custom+Stands",
    backgroundImage: "https://dummyimage.com/1920x300/007bff/fff&text=Custom+Stands+Background",
    longDesc:
      "Our custom stands are crafted with precision to ensure your brand stands out. We use high-quality materials and innovative designs to create a unique experience for your visitors.",
    sliderImages: [
      "https://dummyimage.com/800x400/007bff/fff&text=Slider+1",
      "https://dummyimage.com/800x400/f4a261/fff&text=Slider+2",
      "https://dummyimage.com/800x400/2a9d8f/fff&text=Slider+3",
    ],
  },
  {
    id: 2,
    title: "Country Pavilion",
    desc: "Showcase your country’s culture, industry, and innovations with a professionally designed pavilion.",
    image: "https://dummyimage.com/500x350/f4a261/fff&text=Country+Pavilion",
    backgroundImage: "https://dummyimage.com/1920x300/f4a261/fff&text=Country+Pavilion+Background",
    longDesc:
      "Our country pavilions are designed to represent your nation’s heritage and achievements. We create immersive environments that captivate and engage visitors.",
    sliderImages: [
      "https://dummyimage.com/800x400/007bff/fff&text=Slider+1",
      "https://dummyimage.com/800x400/f4a261/fff&text=Slider+2",
      "https://dummyimage.com/800x400/2a9d8f/fff&text=Slider+3",
    ],
  },
  {
    id: 3,
    title: "Interior & Exterior Design",
    desc: "Create stunning interiors and eye-catching exteriors to enhance your exhibition space and attract visitors.",
    image: "https://dummyimage.com/500x350/2a9d8f/fff&text=Interior+Exterior",
    backgroundImage: "https://dummyimage.com/1920x300/2a9d8f/fff&text=Interior+Exterior+Background",
    longDesc:
      "From concept to completion, our interior and exterior designs transform spaces into visually stunning environments that leave a lasting impression.",
    sliderImages: [
      "https://dummyimage.com/800x400/007bff/fff&text=Slider+1",
      "https://dummyimage.com/800x400/f4a261/fff&text=Slider+2",
      "https://dummyimage.com/800x400/2a9d8f/fff&text=Slider+3",
    ],
  },
  {
    id: 4,
    title: "Mezzanine Stands",
    desc: "Maximize your exhibition space with multi-level mezzanine stands that offer a unique and premium look.",
    image: "https://dummyimage.com/500x350/e63946/fff&text=Mezzanine+Stands",
    backgroundImage: "https://dummyimage.com/1920x300/e63946/fff&text=Mezzanine+Stands+Background",
    longDesc:
      "Our mezzanine stands are designed to optimize space and provide a premium experience. Perfect for brands looking to make a bold statement.",
    sliderImages: [
      "https://dummyimage.com/800x400/007bff/fff&text=Slider+1",
      "https://dummyimage.com/800x400/f4a261/fff&text=Slider+2",
      "https://dummyimage.com/800x400/2a9d8f/fff&text=Slider+3",
    ],
  },
];

export default function ServiceDetailPage({ params }) {
  const { id } = use(params);
  const service = services.find((s) => s.id === Number(id));

  if (!service) {
    return (
      <Layout title="Service Not Found">
        <Container sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h4" color="textPrimary" sx={{ mb: 3 }}>
            Service Not Found
          </Typography>
          <Button variant="contained" color="primary" href="/services">
            Back to Services
          </Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout title={service.title}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          backgroundImage: `url(${serviceBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "var(--font-syne)",
        }}
      >
        <Box sx={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)" }} />
       
          <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: "var(--font-syne)" }}>
              {service.title}
            </Typography>
            <Breadcrumbs
              sx={{ color: "white", justifyContent: "center", display: "flex", mt: 1, fontFamily: "var(--font-syne)" }}
            >
              <Link href="/" underline="hover" color="inherit" sx={{ fontFamily: "var(--font-syne)" }}>
                Home
              </Link>
              <Link href="/services" underline="hover" color="inherit" sx={{ fontFamily: "var(--font-syne)" }}>
                Services
              </Link>
              <Typography color="white" sx={{ fontFamily: "var(--font-syne)" }}>
                {service.title}
              </Typography>
            </Breadcrumbs>
          </Box>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Left Side: Title, Short Desc, Long Desc */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography fontSize={30} fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 3 }}>
                {service.title}
              </Typography>
              <Typography fontSize={20} color="textSecondary" sx={{ mb: 3, fontFamily: "var(--font-syne)" }}>
                {service.desc}
              </Typography>
              <Typography fontSize={18} sx={{ mb: 3, fontFamily: "var(--font-syne)" }}>
                {service.longDesc}
              </Typography>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.5 }}>
                <Button variant="contained" color="primary" href="/services">
                  Back to Services
                </Button>
              </motion.div>
            </motion.div>
          </Grid>

          {/* Right Side: Image with Abnormal Design */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "400px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transform: "rotate(2deg)", // Abnormal design
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Image src={service.image} alt={service.title} fill />
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Swiper Slider */}
        <Box sx={{ mt: 15 }}>
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
            {service.sliderImages.map((img, index) => (
              <SwiperSlide key={index}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Box
                    component="img"
                    src={img}
                    alt={`Portfolio ${index + 1}`}
                    width="100%"
                    height="auto"
                    borderRadius="8px"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Layout>
  );
}