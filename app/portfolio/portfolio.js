"use client";

import { useState } from "react";
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
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import Layout from "../../layout/layout";
import portfolioBg from "@/public/assets/images/portfolio.jpg";

// Dummy Portfolio Images
const portfolioImages = Array.from(
  { length: 20 },
  (_, i) =>
    `https://dummyimage.com/600x400/${(Math.random() * 0xffffff)
      .toString(16)
      .slice(0, 6)}/fff&text=Project+${i + 1}`
);

export default function PortfolioPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
             fontFamily= "var(--font-syne)"
          >
            Our Portfolio
          </Typography>
          <Breadcrumbs sx={{ color: "white", justifyContent: "center", display: "flex", mt: 1, fontFamily: "var(--font-syne)" }}>
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
          {portfolioImages.map((img, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box
                component="img"
                src={img}
                alt={`Project ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                  fontFamily: "var(--font-syne)",
                }}
                onClick={() => setSelectedImage(img)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Modal for Image Preview */}
        <Modal
          open={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
              borderRadius: "10px",
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: "var(--font-syne)",
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{ position: "absolute", top: 10, right: 10 }}
            >
              <CloseIcon />
            </IconButton>

            {/* Image */}
            <Image
              src={selectedImage || ""}
              alt="Large Preview"
              width={800}
              height={600}
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />

            {/* Buttons Container */}
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              {/* Download Button */}
              <Tooltip title="Download">
                <IconButton onClick={handleDownload}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>

              {/* Share Button */}
              <Tooltip title="Copy Link">
                <IconButton onClick={handleShare}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Modal>

        {/* Snackbar for "Link Copied!" */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={() => setOpenSnackbar(false)}
          message="Link copied!"
        />
      </Container>
    </Layout>
  );
}
