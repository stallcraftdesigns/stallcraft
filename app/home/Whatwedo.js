import { Grid, Typography, Button, Box } from "@mui/material";

const whatWeDoImage =
  "https://dummyimage.com/500x500/007bff/fff&text=What+We+Do";

const WhatWeDo = () => {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
        position: "relative",
        bgcolor: "#FAF9F6",
        py: 5,
      }}
    >
      <Box
        sx={{
          width: "90%",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          mx:"auto"
        }}
      >
        <Grid
          container
          spacing={6}
          alignItems="center"
          direction={{ xs: "column-reverse", md: "row" }}
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
            <Typography variant="body1" sx={{ color: "grey.700", mb: 4 }}>
              Our expertise spans across web development, UI/UX design, mobile
              applications, and digital marketing. We build powerful and
              scalable solutions that help businesses grow in the digital world.
              Whether you need a sleek website, an intuitive mobile app, or a
              complete brand transformation, we deliver exceptional results.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                borderRadius: "30px",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                transition: "0.3s",
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
              component="img"
              src={whatWeDoImage}
              alt="What We Do"
              sx={{
                width: "100%",
                maxWidth: 500,
                borderRadius: "40% 60% 50% 50%",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05) rotate(2deg)",
                },
              }}
            />
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

export default WhatWeDo;
