"use client";
import { Box, Grid, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

const Count = () => {
  const [startCounting, setStartCounting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
        }
      },
      { threshold: 0.5 } // Trigger when at least 50% of the component is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        height: "auto",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle, rgba(91,193,188,1) 0%, rgba(64,66,66,1) 100%)",
        py: 10,
        fontFamily: "var(--font-syne)",
        mb: 3,
      }}
    >
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {[
          { label: "Happy Clients", end: 10000 },
          { label: "Venues", end: 500 },
          { label: "Stalls Made", end: 1500 },
        ].map((item, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ textAlign: "center" }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#fff",
                fontSize: "2.5rem",
                textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
                fontFamily: "var(--font-syne)",
              }}
            >
              {startCounting && <CountUp start={0} end={item.end} duration={3} />}
              +
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "1.2rem",
                fontFamily: "var(--font-syne)",
                letterSpacing: "0.5px",
              }}
            >
              {item.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Count;
