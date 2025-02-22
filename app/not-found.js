"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        padding: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "#ff5252", mb: 2 }} />
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 500, color: "#555", mb: 3 }}>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        href="/"
        sx={{ fontWeight: "bold", padding: "10px 20px", fontSize: "16px" }}
      >
        Go Back Home
      </Button>
    </Box>
  );
}
