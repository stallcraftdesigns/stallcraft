"use client";

import { Typography, Box } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import step1 from "../../public/assets/images/step1.jpg";
import step2 from "../../public/assets/images/step2.jpg";
import step3 from "../../public/assets/images/step3.jpg";

const Steps = () => {
  return (
    <Box
      sx={{
        py: 12,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        fontFamily="var(--font-syne)"
        mb={6}
        sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }} // Responsive font
      >
        Our Process
      </Typography>

      {/* Steps Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" },
          gridTemplateRows: { xs: "auto", md: "auto auto" },
          gap: { xs: 4, md: 6 },
          maxWidth: "1200px",
          width: "100%",
          px: { xs: 3, md: 0 },
          "& > div:nth-of-type(3)": {
            gridColumn: { md: "1 / span 2", lg: "auto" }, // Center Step 3 on medium screens
          },
        }}
      >
        {/* Step 1 */}
        <Box sx={stepBoxStyles}>
          <Box
            sx={{
              height: 350, // Fixed height for image container
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden", // Ensures images don't overflow
            }}
          >
            <Image
              src={step1}
              alt="Step 1"
              width={340}
              height={260}
              style={{
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Box>
          <StepTitle text="Understanding Your Needs" />
          <StepDescription text="We take time to analyze your goals and craft a strategic approach." />
        </Box>

        {/* Step 2 */}
        <Box sx={stepBoxStyles}>
          <Box
            sx={{
              height: 350, // Fixed height for image container
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src={step2}
              alt="Step 2"
              width={340}
              height={260}
              style={{
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Box>
          <StepTitle text="Collaborative Ideation" />
          <StepDescription text="Ideas take shape through discussion, research, and creativity." />
        </Box>

        {/* Step 3 */}
        <Box sx={stepBoxStyles}>
          <Box
            sx={{
              height: 350, // Fixed height for image container
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src={step3}
              alt="Step 3"
              width={340}
              height={260}
              style={{
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Box>
          <StepTitle text="Crafting the Experience" />
          <StepDescription text="Turning concepts into visually stunning and functional solutions." />
        </Box>
      </Box>
    </Box>
  );
};

// Common Box Styles for Steps
const stepBoxStyles = {
  textAlign: "center",
  maxWidth: "100%",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
};

// Step Title Component
const StepTitle = ({ text }) => (
  <Typography
    variant="h5"
    fontWeight="bold"
    mt={3}
    sx={{
      fontSize: { xs: "1.2rem", md: "1.5rem" },
      display: "flex",
      alignItems: "center",
      gap: 1,
      justifyContent: "center",
      fontFamily: "var(--font-syne)",
    }}
  >
    <FaCheckCircle color="#007bff" size={20} /> {text}
  </Typography>
);

// Step Description Component
const StepDescription = ({ text }) => (
  <Typography
    variant="body1"
    sx={{
      color: "grey.700",
      mt: 1,
      fontSize: { xs: "1rem", md: "1.1rem" },
      fontFamily: "var(--font-syne)",
    }}
  >
    {text}
  </Typography>
);

export default Steps;