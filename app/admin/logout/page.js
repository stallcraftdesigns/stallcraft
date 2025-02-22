"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    // Redirect to login after a delay
    setTimeout(() => {
      router.push("/");
    }, 600);
  }, [router]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <CircularProgress color="primary" size={50} sx={{ mb: 2 }} />
      <Typography variant="h6" fontWeight="bold">
        Logging out...
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Please wait while we log you out.
      </Typography>
    </Box>
  );
}
