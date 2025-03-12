"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Modal,
  Typography,
  IconButton,
  Breadcrumbs,
  Link,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import Layout from "../../layout/layout";
import portfolioBg from "@/public/assets/images/portfolio.jpg";
import { motion, AnimatePresence } from "framer-motion";

// Dummy Portfolio Images
const portfolioImages = Array.from(
  { length: 20 },
  (_, i) =>
    `https://dummyimage.com/600x400/${(Math.random() * 0xffffff)
      .toString(16)
      .slice(0, 6)}/fff&text=Project+${i + 1}`
);

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch brands from API
  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/routes/portfolio?status=active");
      const data = await response.json();
      setPortfolios(data.data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleShare = () => {
    if (selectedImage) {
      navigator.clipboard.writeText(selectedImage);
      setOpenSnackbar(true);
    }
  };

  const handleDownload = async () => {
    if (!selectedImage) return;

    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `Project_Image.jpg`; // Default filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke blob URL after download
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Layout title="Portfolio">
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
          backgroundImage: `url(${portfolioBg.src})`,
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
            Our Portfolio
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
            <Link
              href="/"
              underline="hover"
              color="inherit"
              sx={{ fontFamily: "var(--font-syne)" }}
            >
              Home
            </Link>
            <Typography color="white" sx={{ fontFamily: "var(--font-syne)" }}>
              Portfolio
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      <Container sx={{ py: 5, fontFamily: "var(--font-syne)" }}>
        <Typography
          fontSize={25}
          align="center"
          sx={{ color: "grey.600", mb: 5, fontFamily: "var(--font-syne)" }}
        >
          Explore our recent projects showcasing creativity and innovation.
        </Typography>

        {/* Image Grid */}
        <Grid container spacing={2}>
          {portfolios.map((portfolio) => (
            <Grid item xs={6} sm={4} md={3} key={portfolio.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Box
                  component="img"
                  src={portfolio.image}
                  alt="Project"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                  onClick={() => setSelectedImage(portfolio.image)}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Modal for Image Preview */}
        <AnimatePresence>
          {selectedImage && (
            <Modal
              open={Boolean(selectedImage)}
              onClose={() => setSelectedImage(null)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "800px", // Adjust max width as needed
                margin: "auto", // Center the modal horizontally
              }}
            >
              <Box
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 2,
                  borderRadius: "10px",
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  overflow: "auto", // Add scroll if content overflows
                }}
              >
                {/* Close Button */}
                <IconButton
                  onClick={() => setSelectedImage(null)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 1, // Ensure it's above other content
                    borderRadius: "50%", // Make it circular
                    "&:hover": {
                      backgroundColor: "action.hover", // Add hover effect
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {/* Image */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 4, // Add margin to account for the close button
                  }}
                >
                  <Image
                    src={selectedImage}
                    alt="Large Preview"
                    width={600}
                    height={400}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "70vh",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* Buttons Container */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 2,
                    mb: 2, // Add margin at the bottom
                  }}
                >
                  {/* Download Button */}
                  <Tooltip title="Download">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton onClick={handleDownload}>
                        <DownloadIcon />
                      </IconButton>
                    </motion.div>
                  </Tooltip>

                  {/* Share Button */}
                  <Tooltip title="Copy Link">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton onClick={handleShare}>
                        <ShareIcon />
                      </IconButton>
                    </motion.div>
                  </Tooltip>
                </Box>
              </Box>
            </Modal>
          )}
        </AnimatePresence>

        {/* Snackbar for "Link Copied!" */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={() => setOpenSnackbar(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert onClose={() => setOpenSnackbar(false)} severity="success">
              Link copied!
            </Alert>
          </motion.div>
        </Snackbar>
      </Container>
    </Layout>
  );
}
