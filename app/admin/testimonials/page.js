"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Snackbar,
  Alert,
  Modal,
  Box,
  TextField,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [loading, setLoading] = useState({
    get: false,
    add: false,
    update: false,
    delete: false,
  });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("active");
  const [message, setMessage] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [filter, setFilter] = useState("all");

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading((prev) => ({ ...prev, get: true }));
      const response = await fetch("/api/routes/testimonials");
      const data = await response.json();
      setTestimonials(data.data || []);
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to fetch testimonials", severity: "error" });
    } finally {
      setLoading((prev) => ({ ...prev, get: false }));
    }
  };

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Filter testimonials based on status
  useEffect(() => {
    if (filter === "all") {
      setFilteredTestimonials(testimonials);
    } else {
      setFilteredTestimonials(testimonials.filter((testimonial) => testimonial.status === filter));
    }
  }, [filter, testimonials]);

  // Open modal for Add/Edit
  const handleOpen = (testimonial = null) => {
    setEditing(!!testimonial);
    setSelectedTestimonial(testimonial);
    setName(testimonial ? testimonial.name : "");
    setEmail(testimonial ? testimonial.email : "");
    setStatus(testimonial ? testimonial.status : "active");
    setMessage(testimonial ? testimonial.message : "");
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setName("");
    setEmail("");
    setStatus("active");
    setMessage("");
  };

  // Add or Edit Testimonial
  const handleSubmit = async () => {
    const isEditing = editing && selectedTestimonial;
    try {
      setLoading((prev) => ({ ...prev, [isEditing ? "update" : "add"]: true }));
  
      const requestBody = {
        name,
        email,
        status,
        message,
      };
  
      const response = await fetch(
        isEditing 
          ? `/api/routes/testimonials/${selectedTestimonial.id}` 
          : "/api/routes/testimonials",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) { // Use response.ok instead of checking statusCode
        fetchTestimonials(); // Only fetch new testimonials if the request was successful
        handleClose();
        setSnackbar({ 
          open: true, 
          message: isEditing ? "Testimonial updated!" : "Testimonial added!", 
          severity: "success" 
        });
      } else {
        throw new Error(data.errorMessage || "Operation failed");
      }
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: error.message || "Operation failed", 
        severity: "error" 
      });
    } finally {
      setLoading((prev) => ({ ...prev, [isEditing ? "update" : "add"]: false }));
    }
  };  

  // Delete Testimonial
  const handleDelete = async (id) => {
    try {
      setLoading((prev) => ({ ...prev, delete: true }));

      const response = await fetch(`/api/routes/testimonials/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        fetchTestimonials();
        setSnackbar({ open: true, message: "Testimonial deleted!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: data.errorMessage || "Delete failed", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Grid container alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Testimonials
        </Typography>

        {/* Filter and Add Button */}
        <Grid container item xs={6} justifyContent="flex-end" spacing={2}>
          <Grid item>
            <FormControl sx={{ minWidth: 150 }}>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                fullWidth
                displayEmpty
                sx={{
                  background: "#fff",
                  borderRadius: 2,
                  "& .MuiSelect-select": { py: 1 },
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpen()}
              disabled={loading.get || loading.add || loading.update || loading.delete}
            >
              Add Testimonial
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Loading State for GET */}
      {loading.get ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : testimonials.length === 0 ? (
        <Typography textAlign="center" sx={{ mt: 4, fontSize: "1.2rem" }}>
          No testimonials available
        </Typography>
      ) : (
        /* Testimonials Table */
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#333" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Message</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTestimonials.map((testimonial, index) => (
                <TableRow
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{testimonial.name}</TableCell>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{testimonial.email}</TableCell>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{testimonial.status}</TableCell>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{testimonial.message}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(testimonial)}
                      disabled={loading.get || loading.add || loading.update || loading.delete}
                    >
                      <FaRegEdit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(testimonial.id)}
                      disabled={loading.get || loading.add || loading.update || loading.delete}
                    >
                      <RiDeleteBin6Line />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add / Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "60%", md: "40%" },
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {editing ? "Edit Testimonial" : "Add Testimonial"}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end" mt={2}>
            <Button onClick={handleClose} color="error" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={loading.add || loading.update}
            >
              {loading.add || loading.update ? <CircularProgress size={24} /> : editing ? "Update" : "Add"}
            </Button>
          </Grid>
        </Box>
      </Modal>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}