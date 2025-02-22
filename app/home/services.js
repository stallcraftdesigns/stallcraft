"use client";

import {
  Container,
  Grid,
  Typography,
  Card,
  Button,
  Box,
  CardContent,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Custom Stands",
    desc: "Tailor-made exhibition stands designed to reflect your brand identity and maximize visitor engagement.",
    image: "https://dummyimage.com/500x350/007bff/fff&text=Custom+Stands",
  },
  {
    id: 2,
    title: "Country Pavilion",
    desc: "Showcase your country’s culture, industry, and innovations with a professionally designed pavilion.",
    image: "https://dummyimage.com/500x350/f4a261/fff&text=Country+Pavilion",
  },
  {
    id: 3,
    title: "Interior & Exterior Design",
    desc: "Create stunning interiors and eye-catching exteriors to enhance your exhibition space and attract visitors.",
    image: "https://dummyimage.com/500x350/2a9d8f/fff&text=Interior+Exterior",
  },
  {
    id: 4,
    title: "Mezzanine Stands",
    desc: "Maximize your exhibition space with multi-level mezzanine stands that offer a unique and premium look.",
    image: "https://dummyimage.com/500x350/e63946/fff&text=Mezzanine+Stands",
  },
];

const Services = () => {
  return (
    <Container
      sx={{ py: 10, width: { xs: "90%", md: "100%" }, textAlign: "center" }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        mb={8}
        fontWeight="bold"
        fontFamily="var(--font-syne)"
      >
        Our Services
      </Typography>

      {/* Services Grid (only top 3) */}
      <Grid container spacing={4} justifyContent="center">
        {services.slice(0, 3).map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card
              sx={{
                boxShadow: 4,
                borderRadius: "12px",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              {/* Service Image */}
              <Box
                sx={{ position: "relative", width: "100%", height: "200px" }}
              >
                <Image src={service.image} alt={service.title} layout="fill" />
              </Box>

              {/* Card Content */}
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ fontFamily: "var(--font-syne)", mb: 1 }}
                >
                  {service.title}
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ fontFamily: "var(--font-syne)", mb: 2 }}
                >
                  {service.desc}
                </Typography>

                {/* Know More Button (Navigates to service single page) */}
                <Link href={`/services/${service.id}`} passHref>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Know More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View All Button */}
      <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <Link href="/services" passHref>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #00c6ff, #0072ff)", // Cyan to Blue Gradient
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              padding: "10px 30px",
              borderRadius: "30px",
              textTransform: "none",
              transition: "0.3s",
              boxShadow: "0px 4px 10px rgba(0, 114, 255, 0.4)",

              "&:hover": {
                background: "linear-gradient(45deg, #0072ff, #00c6ff)", // Reverse Gradient on Hover
                boxShadow: "0px 6px 12px rgba(0, 114, 255, 0.6)",
                transform: "scale(1.05)",
              },
            }}
          >
            View All
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Services;
