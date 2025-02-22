"use client";

import { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie";
import { Box, Typography } from "@mui/material";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <CookieConsent
      location="bottom"
      cookieName="cookieConsent"
      style={{
        background: "linear-gradient(90deg, #1a237e, #007bff)",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
        fontFamily: "Syne, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
      buttonStyle={{
        background: "#ffcc00",
        color: "#222",
        fontSize: "16px",
        padding: "10px 20px",
        borderRadius: "6px",
        border: "none",
        fontWeight: "bold",
        transition: "0.3s",
      }}
      buttonText="Accept Cookies"
      expires={365}
      onAccept={handleAccept}
    >
      <Box sx={{ textAlign: "left", maxWidth: "600px" }}>
        <Typography variant="h6" fontWeight="bold">
          🍪 We Value Your Privacy
        </Typography>
        <Typography variant="body2" sx={{ color: "#ddd", mt: 1 }}>
          We use cookies to enhance your experience, analyze site usage, and
          personalize content. By continuing to use our site, you agree to our{" "}
          <Box
            component="span"
            sx={{ textDecoration: "underline", cursor: "pointer", color: "#ffcc00" }}
          >
            Privacy Policy
          </Box>
          .
        </Typography>
      </Box>
    </CookieConsent>
  );
};

export default CookieBanner;
