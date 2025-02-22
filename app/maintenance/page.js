"use client";

import { Syne } from "next/font/google";
import { FaTools, FaHourglassHalf } from "react-icons/fa"; // Import icons

// Load Syne font
const syneFont = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

export default function Maintenance() {
  return (
    <div
      className={syneFont.variable} // Apply the Syne font
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background:
          "linear-gradient(170deg, rgba(245,237,65,1) 0%, rgba(142,244,213,1) 100%)",
        padding: "20px",
        fontFamily: "var(--font-syne)", // Use Syne font globally
      }}
    >
      <div
        style={{
          padding: "30px",
          borderRadius: "10px",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(to bottom, #e3f2fd, #bbdefb)", // Light blue gradient
        }}
      >
        {/* Icon at the top */}
        <FaTools size={60} color="#007bff" style={{ marginBottom: "10px" }} />

        {/* Main heading */}
        <h1
          style={{
            color: "#007bff",
            fontSize: "28px",
            marginBottom: "10px",
            fontWeight: "700",
            fontFamily: "var(--font-syne)", // Use Syne font globally
          }}
        >
          Maintenance Mode
        </h1>

        {/* Maintenance message */}
        <p
          style={{
            color: "#555",
            fontSize: "16px",
            fontWeight: "500",
            fontFamily: "var(--font-syne)", 
          }}
        >
          Our site is currently undergoing maintenance. Please check back later.
        </p>

        {/* Additional message with an icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "15px",
            color: "#777",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          <FaHourglassHalf size={20} color="#ff9800" />
          <span>Thank you for your patience!</span>
        </div>
      </div>
    </div>
  );
}
