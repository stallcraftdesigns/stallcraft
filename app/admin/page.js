'use client';

import { Box, Typography, Grid, Card, CardContent, Divider, List, ListItem, ListItemText } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkIcon from "@mui/icons-material/Work";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import StarsIcon from "@mui/icons-material/Stars";
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
    { title: "Total Leads", value: "560", icon: <WorkIcon />, gradient: "linear-gradient(135deg, #fd7e14, #d26e0d)" },
    { title: "Total Portfolios", value: "240", icon: <BrandingWatermarkIcon />, gradient: "linear-gradient(135deg, #20c997, #178f6b)" },
    { title: "Total Brands", value: "112", icon: <BrandingWatermarkIcon />, gradient: "linear-gradient(135deg, #6f42c1, #563d7c)" },
    { title: "Testimonials", value: "75", icon: <StarsIcon />, gradient: "linear-gradient(135deg, #17a2b8, #117a8b)" },
  ];

  const blogs = [
    { title: "How to Improve Customer Engagement", date: "Feb 24, 2025", description: "Learn the best strategies to boost customer engagement and retention." },
    { title: "Top Marketing Trends in 2025", date: "Feb 20, 2025", description: "Discover the latest marketing trends that will dominate this year." },
    { title: "The Future of CRM Software", date: "Feb 18, 2025", description: "Explore how AI and automation are shaping CRM solutions." },
  ];

  const activities = [
    { message: "John Doe added a new testimonial.", time: "10 min ago" },
    { message: "Admin updated the services list.", time: "30 min ago" },
    { message: "New user registered: Alex Smith.", time: "1 hour ago" },
    { message: "System backup completed successfully.", time: "3 hours ago" },
    { message: "New blog post published: The Future of CRM Software.", time: "1 day ago" },
  ];

  return (
    <Box 
      className={syneFont.variable} 
      sx={{ 
        padding: isSmallScreen ? 2 : 4, 
        fontFamily: "var(--font-syne)", 
        backgroundColor: "#f4f6f9", 
        minHeight: "100vh" 
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3, color: "#333" }}>
        Welcome, Super Admin !
      </Typography>

      <Divider sx={{ marginBottom: 3 }} />

      {/* Stats Cards */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                background: stat.gradient,
                color: "white",
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
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

      {/* Blog Section */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 4, marginBottom: 2, color: "#333" }}>
        Latest Blog Posts
      </Typography>
      <Grid container spacing={3}>
        {blogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 2, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                  {blog.date}
                </Typography>
                <Typography variant="body1">{blog.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activities Section */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 4, marginBottom: 2, color: "#333" }}>
        Recent Activities
      </Typography>
      <Card sx={{ p: 2, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <List>
          {activities.map((activity, index) => (
            <ListItem key={index} sx={{ borderBottom: index !== activities.length - 1 ? "1px solid #e0e0e0" : "none" }}>
              <ListItemText 
                primary={activity.message} 
                secondary={activity.time} 
                primaryTypographyProps={{ fontWeight: "bold" }} 
              />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}
