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
import { useState, useEffect } from "react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch brands from API
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/routes/services?status=active");
      const data = await response.json();
      setServices(data.data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);


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
    display: "flex",
    flexDirection: "column",
    height: "100%", // Ensure card takes full height
  }}
>
  {/* Service Image */}
  <Box sx={{ position: "relative", width: "100%", height: "200px" }}>
    <Image src={service.image} alt={service.title} layout="fill" />
  </Box>

  {/* Card Content (Flexbox Applied) */}
  <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{ fontFamily: "var(--font-syne)", mb: 1 }}
    >
      {service.title}
    </Typography>

    {/* Wrapper to ensure button stays at the bottom */}
    <Box sx={{ mt: "auto", pt: 2 }}>
      <Link href={`/services/${service.id}`} passHref>
        <Button variant="contained" color="primary">
          Know More
        </Button>
      </Link>
    </Box>
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
