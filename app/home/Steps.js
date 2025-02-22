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
        mb={8}
      >
        Our Process
      </Typography>

      {/* Steps Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Vertical on small, row on large screens
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 6, md: 10 }, // Space between steps
          maxWidth: "1300px",
          width: "100%",
          px: { xs: 3, md: 0 }, // Padding for mobile view
        }}
      >
        {/* Step 1 */}
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "400px",
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.05)" }, // Hover effect
          }}
        >
          <Image src={step1} alt="Step 1" width={340} height={260} />
          <Typography
            variant="h5"
            fontWeight="bold"
            mt={3}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
              fontFamily: "var(--font-syne)",
            }}
          >
            <FaCheckCircle color="#007bff" size={24} /> Understanding Your Needs
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "grey.700",
              mt: 1,
              fontSize: "1.1rem",
              fontFamily: "var(--font-syne)",
            }}
          >
            We take time to analyze your goals and craft a strategic approach.
          </Typography>
        </Box>

        {/* Step 2 */}
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "400px",
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          <Image src={step2} alt="Step 2" width={340} height={260} />
          <Typography
            variant="h5"
            fontWeight="bold"
            mt={3}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
              fontFamily: "var(--font-syne)",
            }}
          >
            <FaCheckCircle color="#007bff" size={24} /> Collaborative Ideation
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "grey.700",
              mt: 1,
              fontSize: "1.1rem",
              fontFamily: "var(--font-syne)",
            }}
          >
            Ideas take shape through discussion, research, and creativity.
          </Typography>
        </Box>

        {/* Step 3 */}
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "400px",
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          <Image src={step3} alt="Step 3" width={340} height={260} />
          <Typography
            variant="h5"
            fontWeight="bold"
            mt={3}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
              fontFamily: "var(--font-syne)",
            }}
          >
            <FaCheckCircle color="#007bff" size={24} /> Crafting the Experience
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "grey.700",
              mt: 1,
              fontSize: "1.1rem",
              fontFamily: "var(--font-syne)",
            }}
          >
            Turning concepts into visually stunning and functional solutions.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Steps;
