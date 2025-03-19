"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Breadcrumbs,
  Link,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import Layout from "../../layout/layout";
import contactBg from "@/public/assets/images/contact.jpg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import TopBar from "../TopBar";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    message: "",
    status: "new",
    createdOn: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/routes/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.statusCode == 201) {
        setOpen(true);
        setFormData({ name: "", email: "", phoneNo: "", message: "" });
      } else {
        console.error("Failed to submit lead:", result.errorMessage);
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: <FaFacebookF />, color: "#1877F2", link: "https://www.facebook.com/share/1AZexmgig9/?mibextid=wwXIfr" },
    { icon: <FaWhatsapp />, color: "#25D366", link: "https://wa.me/919910954993" }, // Replace with actual number
    { icon: <FaInstagram />, color: "#E4405F", link: "https://www.instagram.com/stallcraftdesigns" },
  ];

  return (
    <Layout title="Contact">
      <TopBar />
      {/* Top Section with Background Image */}
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
          backgroundImage: `url(${contactBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
            sx={{ fontFamily: "var(--font-syne)" }}
          >
            Contact Us
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
            <Link href="/" underline="hover" color="inherit">
              Home
            </Link>
            <Typography color="white">Contact</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Contact Form Section */}
      <Container sx={{ py: 10, width: "90%" }}>
        <Grid container spacing={4} justifyContent="center">
          {/* Contact Details */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                fontFamily="var(--font-syne)"
              >
                Get in Touch
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 5 }}
                fontFamily="var(--font-syne)"
              >
                Have any questions or inquiries? Feel free to reach out to us.
              </Typography>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                  <Email color="error" />
                  <Typography
                    fontFamily="var(--font-syne)"
                    fontSize="20px"
                    fontWeight="bold"
                  >
                    contact@stallcraftdesigns.in
                  </Typography>
                </Box>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                  <Phone color="error" />
                  <Typography
                    fontFamily="var(--font-syne)"
                    fontSize="20px"
                    fontWeight="bold"
                  >
                    +91 9910-954-993
                  </Typography>
                </Box>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <LocationOn color="error" />
                  <Typography
                    fontFamily="var(--font-syne)"
                    fontSize="18px"
                    fontWeight="bold"
                  >
                    Plot No 69, First Floor, Ahinsa Khand 2, <br /> IndiraPuram,
                    Ghaziabad, <br /> Uttar Pradesh, 201014
                  </Typography>
                </Box>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 4, mt: 3 }}>
                  <Typography
                    fontFamily="var(--font-syne)"
                    fontSize={20}
                    fontWeight="bold"
                  >
                    Social Links:
                  </Typography>

                  {socialLinks.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        style={{
                          fontSize: 26,
                          color: item.color,
                          cursor: "pointer",
                        }}
                      >
                        {item.icon}
                      </motion.div>
                    </motion.a>
                  ))}
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  p: 4,
                  borderRadius: 3,
                  boxShadow: 2,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <TextField
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="standard"
                  fullWidth
                  required
                />
                <TextField
                  label="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  variant="standard"
                  fullWidth
                  required
                />
                <TextField
                  label="Your Phone"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  type="tel"
                  variant="standard"
                  fullWidth
                  required
                  inputProps={{ pattern: "[0-9]{10}" }}
                />
                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="standard"
                  fullWidth
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ borderRadius: 3 }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Google Map */}
      <Box sx={{ width: "100%", height: "80vh", mt: 5 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7003.125971887019!2d77.37747651192531!3d28.64285706815394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf0014084eaeb%3A0x685690ffd1fe2acc!2sAhinsa%20Khand%202%2C%20Indirapuram%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201014!5e0!3m2!1sen!2sin!4v1740208665270!5m2!1sen!2sin"
          width="100%"
          height="100%"
          loading="lazy"
        ></iframe>
      </Box>

      {/* Success Toast */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={() => setOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert onClose={() => setOpen(false)} severity="success">
                Message sent successfully!
              </Alert>
            </Snackbar>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}