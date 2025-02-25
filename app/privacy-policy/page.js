"use client";

import { Box, Container, Typography, Link, Breadcrumbs } from "@mui/material";
import Layout from "../../layout/layout";
import privacyBg from "@/public/assets/images/privacy.jpg";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy">
      {/* Hero Section */}
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
          backgroundImage: `url(${privacyBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "var(--font-syne)",
        }}
      >
        <Box sx={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)" }} />
          <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: "var(--font-syne)" }}>
              Privacy Policy
            </Typography>
            <Breadcrumbs
              sx={{ color: "white", justifyContent: "center", display: "flex", mt: 1, fontFamily: "var(--font-syne)" }}
            >
              <Link href="/" underline="hover" color="inherit" sx={{ fontFamily: "var(--font-syne)" }}>
                Home
              </Link>
              <Typography color="white" sx={{ fontFamily: "var(--font-syne)" }}>
                Privacy Policy
              </Typography>
            </Breadcrumbs>
          </Box>
      </Box>

      {/* Privacy Policy Content */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography fontSize={30} fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 3 }}>
            Introduction
          </Typography>
          <Typography fontSize={20} sx={{ fontFamily: "var(--font-syne)", color: "grey.700", mb: 5 }}>
            Welcome to StallCraft’s Designs Privacy Policy. We take your privacy seriously and are committed to protecting your personal data.
            This page outlines what information we collect, how we use it, and how we ensure its confidentiality.
            By using our website, you agree to the terms of this policy.
          </Typography>
        </motion.div>

        {/* Information We Collect Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography fontSize={30} fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 3 }}>
            Information We Collect
          </Typography>
          <Box component="div" sx={{ fontFamily: "var(--font-syne)", color: "grey.700", mb: 5 }}>
            <Typography fontSize={20} sx={{ fontFamily: "var(--font-syne)", color: "grey.700" }}>
              We collect certain personal information when you interact with us through our contact page. This includes:
            </Typography>
            <ul>
              <li>
                <strong>Name:</strong> To personalize our communication with you.
              </li>
              <li>
                <strong>Email Address:</strong> To respond to your inquiries and keep you updated.
              </li>
              <li>
                <strong>Phone Number:</strong> To contact you if needed.
              </li>
              <li>
                <strong>Message:</strong> Any details you share regarding your stall or shop requirements.
              </li>
            </ul>
          </Box>
        </motion.div>

        {/* How We Use Your Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography fontSize={30} fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 3 }}>
            How We Use Your Information
          </Typography>
          <Box component="div" sx={{ fontFamily: "var(--font-syne)", color: "grey.700", mb: 5 }}>
            <Typography fontSize={20} sx={{ fontFamily: "var(--font-syne)", color: "grey.700" }}>
              The data you provide is used strictly for business communication and improving our services. Specifically, we use your
              information to:
            </Typography>
            <ul>
              <li>Respond to inquiries about stalls, shops, and exhibition arrangements.</li>
              <li>Offer personalized solutions based on your needs.</li>
              <li>Improve our website’s usability and customer support experience.</li>
            </ul>
            <Typography fontSize={20} sx={{ fontFamily: "var(--font-syne)", color: "grey.700" }}>
              We do <strong>not</strong> sell, trade, or rent your personal data to any third party.
            </Typography>
          </Box>
        </motion.div>

        {/* Data Confidentiality & Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Typography fontSize={30} fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 3 }}>
            Data Confidentiality & Security
          </Typography>
          <Box component="div" sx={{ fontFamily: "var(--font-syne)", color: "grey.700", mb: 5 }}>
            <Typography fontSize={20} sx={{ fontFamily: "var(--font-syne)", color: "grey.700" }}>
              We take strong measures to keep your information safe:
            </Typography>
            <ul>
              <li>Your details are securely stored and accessible only to authorized personnel.</li>
              <li>We use encryption and secure servers to prevent unauthorized access.</li>
              <li>Your data is only kept for as long as necessary to provide our services.</li>
            </ul>
          </Box>
        </motion.div>

        {/* Your Rights & Control Over Your Data Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Typography fontSize={30} fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 3 }}>
            Your Rights & Control Over Your Data
          </Typography>
          <Box component="div" sx={{ fontFamily: "var(--font-syne)", color: "grey.700", mb: 5 }}>
            <Typography fontSize={20} sx={{ fontFamily: "var(--font-syne)", color: "grey.700" }}>
              You have the right to:
            </Typography>
            <ul>
              <li>Request access to the personal data we hold about you.</li>
              <li>Ask for corrections to inaccurate information.</li>
              <li>Request deletion of your personal data if it is no longer required.</li>
              <li>Withdraw your consent at any time by contacting us.</li>
            </ul>
          </Box>
        </motion.div>

        {/* Cookies & Tracking Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Typography fontSize={30} fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 3 }}>
            Cookies & Tracking Technologies
          </Typography>
          <Typography fontSize={20} sx={{ fontFamily: "var(--font-syne)", color: "grey.700", mb: 5 }}>
            Our website may use cookies to enhance user experience. Cookies help us understand user preferences and improve our services.
            You can disable cookies in your browser settings at any time.
          </Typography>
        </motion.div>

        {/* Policy Updates Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Typography fontSize={30} fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 3 }}>
            Policy Updates
          </Typography>
          <Typography fontSize={20} sx={{ fontFamily: "var(--font-syne)", color: "grey.700", mb: 5 }}>
            We may update this Privacy Policy periodically to reflect changes in our practices.
            We encourage you to review this page regularly for any updates. The latest revision date will always be displayed.
          </Typography>
        </motion.div>

        {/* Contact Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <Typography fontSize={30} fontWeight="bold" sx={{ fontFamily: "var(--font-syne)", mb: 3 }}>
            Contact Us
          </Typography>
          <Typography fontSize={20} sx={{ fontFamily: "var(--font-syne)", color: "grey.700", mb: 5 }}>
            If you have any questions regarding our privacy practices, you can reach us via our{" "}
            <Link href="/contact" underline="hover" sx={{ color: "primary.main" }}>
              Contact Page
            </Link>
            . We are committed to resolving any concerns promptly.
          </Typography>
        </motion.div>
      </Container>
    </Layout>
  );
}