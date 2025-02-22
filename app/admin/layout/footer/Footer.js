import React from "react";
import { Container, Typography, Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography fontSize="30" fontWeight="600" color="text.secondary" fontFamily="var(--font-syne)">
          © {new Date().getFullYear()} Stall Craft Admin Panel. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
