"use client";

import { Container, Grid, Card, CardContent, Typography, Button, Box, Breadcrumbs, Link } from "@mui/material";
import Image from "next/image";
import Layout from "../../layout/layout";
import serviceBg from "@/public/assets/images/services.jpg";
import { useRouter } from "next/navigation";
import Brands from "../home/Brands";
import { motion, AnimatePresence } from "framer-motion";

// Services Data
const services = [
  {
    id: 1,
    title: "Custom Stands",
    desc: "Tailor-made exhibition stands designed to reflect your brand identity and maximize visitor engagement.",
    image: "https://dummyimage.com/600x400/007bff/fff&text=Custom+Stands",
    slug: "custom-stands",
  },
  {
    id: 2,
    title: "Country Pavilion",
    desc: "Showcase your country’s culture, industry, and innovations with a professionally designed pavilion.",
    image: "https://dummyimage.com/600x400/f4a261/fff&text=Country+Pavilion",
    slug: "country-pavilion",
  },
  {
    id: 3,
    title: "Interior & Exterior Design",
    desc: "Create stunning interiors and eye-catching exteriors to enhance your exhibition space and attract visitors.",
    image: "https://dummyimage.com/600x400/2a9d8f/fff&text=Interior+Exterior",
    slug: "interior-exterior-design",
  },
  {
    id: 4,
    title: "Mezzanine Stands",
    desc: "Maximize your exhibition space with multi-level mezzanine stands that offer a unique and premium look.",
    image: "https://dummyimage.com/600x400/e63946/fff&text=Mezzanine+Stands",
    slug: "mezzanine-stands",
  },
];

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardHover = {
  hover: {
    y: -10,
    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
    transition: { type: "spring", stiffness: 300 },
  },
};

export default function ServicesPage() {
  const router = useRouter();

  return (
    <Layout title="Services">
      {/* Hero Section with Animation */}
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
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
          <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: "var(--font-syne)" }}>
              Our Services
            </Typography>
            <Breadcrumbs
              sx={{
                color: "white",
                justifyContent: "center",
                display: "flex",
                mt: 1,
                fontFamily: "var(--font-syne)",
              }}
            >
              <Link href="/" underline="hover" color="inherit" sx={{ fontFamily: "var(--font-syne)" }}>
                Home
              </Link>
              <Typography color="white" sx={{ fontFamily: "var(--font-syne)" }}>
                Services
              </Typography>
            </Breadcrumbs>
          </Box>
      </Box>

      {/* What We Provide Section */}
      <Container maxWidth="lg" sx={{ textAlign: "center", py: 6 }}>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible">
          <Typography fontSize={35} fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 3 }}>
            What We Provide
          </Typography>
          <Typography
            fontSize="20px"
            color="textSecondary"
            sx={{ fontFamily: "var(--font-syne)", maxWidth: "90%", margin: "0 auto" }}
          >
            Stall Craft specializes in providing premium exhibition and fair solutions, including custom-built stalls,
            country pavilions, interior and exterior designs, and mezzanine stands. Our expertise ensures that your
            brand stands out in any event, creating engaging experiences for visitors while optimizing space and
            functionality.
          </Typography>
        </motion.div>
      </Container>

      {/* Services Cards */}
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible">
          <Grid container spacing={4} justifyContent="center">
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={fadeInUp} whileHover="hover">
                  <Card
                    sx={{
                      boxShadow: 4,
                      borderRadius: "12px",
                      overflow: "hidden",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "transform 0.3s",
                    }}
                    component={motion.div}
                    variants={cardHover}
                  >
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Box sx={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
                        <Image
                          src={service.image}
                          alt={service.title}
                          layout="fill"
                          objectFit="cover"
                          style={{ transition: "transform 0.3s" }}
                        />
                      </Box>
                    </motion.div>
                    <CardContent>
                      <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 1 }}>
                        {service.title}
                      </Typography>
                      <Typography color="textSecondary" sx={{ fontFamily: "var(--font-syne)", mb: 2 }}>
                        {service.desc}
                      </Typography>
                      <Link href={`/services/${service.id}`}>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mt: 2 }}
                          component={motion.div}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Know More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Brands Section */}
      <Brands />
    </Layout>
  );
}