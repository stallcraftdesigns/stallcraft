import { Grid, Typography, Button, Box } from "@mui/material";
import Image from "next/image";
import whatwedo from "@/public/assets/images/whatwedo.jpg";
import { memo } from "react";

const WhatWeDo = () => {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
        position: "relative",
        bgcolor: "#FAF9F6",
        py: 10,
      }}
    >
      <Box
        sx={{
          width: "90%",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          mx: "auto",
        }}
      >
        <Grid
          container
          spacing={6}
          alignItems="center"
          direction={{ xs: "column", md: "row" }}
        >
          {/* Text Section */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              fontSize={35}
              sx={{
                fontFamily: "var(--font-syne)",
                mb: 3,
                color: "#333",
                position: "relative",
                display: "inline-block",
              }}
            >
              What We Do
              <Box
                sx={{
                  position: "absolute",
                  bottom: -5,
                  left: 0,
                  width: "60%",
                  height: "5px",
                  backgroundColor: "#007bff",
                  borderRadius: "2px",
                }}
              />
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#444", mb: 3, fontSize: "1.2rem" }}
            >
              We specialize in crafting high-quality digital experiences
              tailored to your business needs.
            </Typography>
            <Typography variant="body1" fontSize={16} sx={{ color: "grey.700", mb: 4 }}>
              Stallcraft Designs is a leading exhibition stall design company, providing high-quality, durable, and attractive stand solutions worldwide. We specialize in design, fabrication, and installation, ensuring your exhibition stand effectively attracts new business. With expertise in Exhibition Project Management, Booth Branding, and Stand Advertising, we deliver end-to-end solutions, helping clients achieve their business goals. As a trusted exhibition stand builder in India, we are committed to efficient trade show booth design and exhibition management.
              <br />
              Our innovative approach ensures unique and eye-catching designs tailored to your brand identity. With a global presence and a dedicated team, we transform ideas into impactful exhibition experiences. We prioritize quality, creativity, and functionality to make your brand stand out in any exhibition. Our customer-centric approach guarantees seamless execution, from concept to completion, ensuring a stress-free experience for our clients.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="/about"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                borderRadius: "30px",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                transition: "0.3s",
                mb: 5,
                "&:hover": {
                  backgroundColor: "#0056b3",
                  transform: "scale(1.05)",
                },
              }}
            >
              Learn More
            </Button>
          </Grid>

          {/* Image Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 500,
                borderRadius: "40% 60% 50% 50%",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                transition: "0.3s",
                overflow: "hidden",
                "&:hover": {
                  transform: "scale(1.05) rotate(2deg)",
                },
              }}
            >
              <Image
                src={whatwedo}
                alt="What We Do"
                layout="responsive"
                width={500}
                height={500}
                placeholder="blur" 
                priority // Prioritize loading
              />
            </Box>
            {/* Decorative Shape */}
            <Box
              sx={{
                position: "absolute",
                width: "100px",
                height: "100px",
                backgroundColor: "#007bff",
                borderRadius: "50%",
                top: "10%",
                right: "-10%",
                opacity: 0.2,
                zIndex: -1,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default memo(WhatWeDo);