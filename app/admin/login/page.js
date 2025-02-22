"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Card,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Box,
  Button,
  CircularProgress, // ✅ Manually added spinner
} from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";

// Dummy user credentials (Replace with API call)
const users = [{ email: "admin@admin.com", password: "123456" }];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 Loading state

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    setTimeout(() => {
      const validUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (validUser) {
        document.cookie = "isAuth=true; path=/; max-age=86400"; // Set cookie for 1 day
        router.push("/admin"); // Redirect to admin dashboard
      } else {
        setError("Invalid email or password!");
      }

      setLoading(false); // Stop loading
    }, 1500); // Simulate API delay
  };

  return (
    <Box maxWidth="full" backgroundColor="#f4f4f4">
      <Container
        maxWidth="xs"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            p: 4,
            width: "100%",
            boxShadow: 3,
            borderRadius: 3,
            backgroundColor: "#ffffff", // White card
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            mb={3}
            color="#333" // Dark gray text
          >
            Admin Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email style={{ color: "#666" }} /> {/* Soft gray icon */}
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon style={{ color: "#666" }} />{" "}
                    {/* Soft gray icon */}
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityOff style={{ color: "#666" }} />
                      ) : (
                        <Visibility style={{ color: "#666" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Sign In Button with Manual Loading State */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading} // ✅ Button disabled while loading
              sx={{
                py: 1.5,
                fontSize: "1rem",
                borderRadius: 2,
                mt: 2,
                backgroundColor: "#555", // Soft dark button
                color: "white",
                "&:hover": {
                  backgroundColor: "#444", // Slightly darker hover effect
                },
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ color: "white", mr: 1 }} />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Card>
      </Container>
    </Box>
  );
}
