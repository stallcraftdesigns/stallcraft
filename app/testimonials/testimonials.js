"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import Layout from "../../layout/layout";
import testimonialsBg from "@/public/assets/images/testimonials.jpg";
import { motion } from "framer-motion";
const testimonial = [
  {
    id: 1,
    name: "Rahul Kumar",
    message: "This service is fantastic! Highly recommended.",
  },
  {
    id: 2,
    name: "Anurag Tyagi",
    message: "Amazing experience! Will use again.",
  },
  {
    id: 3,
    name: "Sagar Kaushik",
    message: "Professional and efficient. Great service!",
  },
  {
    id: 4,
    name: "Vikas Chaudhary",
    message: "Professional and efficient. Great service!",
  },
  {
    id: 5,
    name: "Rekha Sirohi",
    message: "Professional and efficient. Great service!",
  },
];

export default function TestimonialsPage() {
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    email: "",
    message: "",
    status: "inactive", // New testimonials are inactive by default
  });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/routes/testimonials");
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      const data = await response.json();
      setTestimonials(data.data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setSnackbarMessage("Failed to fetch testimonials");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial({ ...newTestimonial, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let tempErrors = {};
    ["name", "email", "message"].forEach((field) => {
      if (!newTestimonial[field].trim())
        tempErrors[field] = "This field is required";
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await fetch("/api/routes/testimonials?status=active", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTestimonial),
      });

      if (!response.ok) {
        throw new Error("Failed to submit testimonial");
      }

      const data = await response.json();
      setTestimonials([...testimonials, data.data]); // Add new testimonial to the list
      setSnackbarMessage("Testimonial submitted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Reset form
      setNewTestimonial({
        name: "",
        email: "",
        message: "",
        status: "inactive",
      });
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setSnackbarMessage("Failed to submit testimonial");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Testimonials">
      {/* Banner Section */}
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
          backgroundImage: `url(${testimonialsBg.src})`,
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
          <Typography variant="h3" fontWeight="bold" fontFamily="var(--font-syne)">
            What Our Clients Say
          </Typography>
          <Breadcrumbs
            sx={{
              color: "white",
              justifyContent: "center",
              display: "flex",
              mt: 1,
            }}
          >
            <Link href="/" underline="hover" color="inherit">
              Home
            </Link>
            <Typography color="white" fontFamily="var(--font-syne)">
              Testimonials
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Testimonials Grid */}
      <Container sx={{ py: 10, width: "90%", fontFamily: "var(--font-syne)" }}>
          <Grid container spacing={4} justifyContent="center">
            {testimonial.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #f0f4f8, #e0e6f0)",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                        fontFamily="var(--font-syne)"
                        sx={{ color: "#007bff" }}
                      >
                        “
                      </Typography>
                      <Typography
                        variant="body1"
                        color="grey.800"
                        fontFamily="var(--font-syne)"
                        sx={{ mb: 3, fontSize: "1.1rem", fontStyle: "italic" }}
                      >
                        {testimonial.message}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                        fontFamily="var(--font-syne)"
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="grey.600"
                        fontFamily="var(--font-syne)"
                      >
                        {testimonial.position}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

        {/* Add Testimonial Form */}
        <Box mt={10} display="flex" justifyContent="center">
          <Card
            sx={{
              p: 4,
              width: "100%",
              maxWidth: 800,
              boxShadow: 1,
              borderRadius: 2,
              background: "#f9f9f9",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
              fontFamily="var(--font-syne)"
              color="text.primary"
            >
              Share Your Experience
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  value={newTestimonial.name}
                  onChange={handleInputChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  sx={{ borderBottom: "1px solid #ccc", pb: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  value={newTestimonial.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ borderBottom: "1px solid #ccc", pb: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Testimonial"
                  name="message"
                  multiline
                  rows={5}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  value={newTestimonial.message}
                  onChange={handleInputChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  sx={{ borderBottom: "1px solid #ccc", pb: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    height: 50,
                    fontSize: 18,
                    borderRadius: 2,
                    backgroundColor: "#333",
                    color: "white",
                    "&:hover": { backgroundColor: "#555" },
                  }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
}