"use client";

import { useState } from "react";
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
import Image from "next/image";

const testimonials = Array.from({ length: 9 }, (_, i) => ({
  name: `Person ${i + 1}`,
  position: "Satisfied Client",
  message: "Great service! Highly recommended.",
  image: `https://dummyimage.com/200x200/007bff/fff&text=Image+${i + 1}`, // Fixed size
}));

export default function TestimonialsPage() {
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
    image: "",
  });
  const [imageName, setImageName] = useState("No file chosen");
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial({ ...newTestimonial, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      setNewTestimonial({ ...newTestimonial, image: file });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    ["name", "email", "phone", "position", "message"].forEach((field) => {
      if (!newTestimonial[field].trim())
        tempErrors[field] = "This field is required";
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setOpenSnackbar(true);
    setNewTestimonial({
      name: "",
      email: "",
      phone: "",
      position: "",
      message: "",
      image: "",
    });
    setImageName("No file chosen");
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
          <Typography
            variant="h3"
            fontWeight="bold"
            fontFamily="var(--font-syne)"
          >
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

      <Container sx={{ py: 10, width: "90%", fontFamily: "var(--font-syne)" }}>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  p: 3,
                  textAlign: "center",
                  boxShadow: 3,
                  borderRadius: 3,
                }}
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={200}
                  height="150"
                />
                <CardContent>
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
                    gutterBottom
                    fontFamily="var(--font-syne)"
                  >
                    {testimonial.position}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="grey.800"
                    fontFamily="var(--font-syne)"
                  >
                    "{testimonial.message}"
                  </Typography>
                </CardContent>
              </Card>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Phone"
                  name="phone"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  value={newTestimonial.phone}
                  onChange={handleInputChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  sx={{ borderBottom: "1px solid #ccc", pb: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} display="flex" flexDirection="column">
                <Button
                  variant="outlined"
                  sx={{
                    height: 45,
                    textTransform: "none",
                    fontSize: 16,
                    borderRadius: 2,
                    color: "black",
                    borderColor: "#aaa",
                  }}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Upload Image
                </Button>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "gray", textAlign: "center" }}
                >
                  {imageName || "No file chosen"}
                </Typography>
              </Grid>
              <input
                id="fileInput"
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
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
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>
    </Layout>
  );
}
