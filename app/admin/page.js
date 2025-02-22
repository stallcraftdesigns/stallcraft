'use client';

import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useMediaQuery } from "@mui/material";
import { Syne } from "next/font/google";

// Load the Syne font
const syneFont = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

export default function AdminDashboard() {
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  const stats = [
    { title: "Total Users", value: "1,250", icon: <PeopleIcon />, color: "#007bff" },
    { title: "Sales", value: "$45,230", icon: <StoreIcon />, color: "#28a745" },
    { title: "Revenue", value: "$120,540", icon: <BarChartIcon />, color: "#ffc107" },
    { title: "New Orders", value: "320", icon: <DashboardIcon />, color: "#dc3545" },
  ];

  return (
    <Box className={syneFont.variable} sx={{ padding: isSmallScreen ? 2 : 4, fontFamily: "var(--font-syne)" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Admin Dashboard
      </Typography>

      {/* Responsive Grid Layout */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: stat.color, color: "white", display: "flex", alignItems: "center", p: 2 }}>
              <Box sx={{ fontSize: 40, marginRight: 2 }}>{stat.icon}</Box>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {stat.title}
                </Typography>
                <Typography variant="h5">{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}