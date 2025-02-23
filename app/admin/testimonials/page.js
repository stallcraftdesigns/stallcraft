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
  Card,
  CardMedia,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [loading, setLoading] = useState({
    get: false, // Loading state for fetching testimonials
    add: false, // Loading state for adding a testimonial
    update: false, // Loading state for updating a testimonial
    delete: false, // Loading state for deleting a testimonial
    toggleVisibility: false, // Loading state for toggling visibility
  });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active")
  const [feedback, setFeedback] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [filter, setFilter] = useState("all"); // Filter state for status


  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading((prev) => ({ ...prev, get: true })); // Set GET loading state
      const response = await fetch("/api/routes/testimonials");
      const data = await response.json();
      setTestimonials(data.data || []);
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to fetch testimonials", severity: "error" });
    } finally {
      setLoading((prev) => ({ ...prev, get: false })); // Reset GET loading state
    }
  };

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Fetch testimonials on component mount
  useEffect(() => {
    if (filter === "all") {
      setFilteredTestimonials(testimonials);
    } else {
      setFilteredTestimonials(testimonials?.filter((testimonial) => testimonial.status === filter));
    }
  }, [filter, testimonials]);

  // Open modal for Add/Edit
  const handleOpen = (testimonial = null) => {
    setEditing(!!testimonial);
    setSelectedTestimonial(testimonial);
    setName(testimonial ? testimonial.name : "");
    setStatus(testimonial ? testimonial.status : "active");
    setFeedback(testimonial ? testimonial.feedback : "");
    setPreview(testimonial ? testimonial.image : "");
    setImage(null);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setName("");
    setStatus("");
    setFeedback("");
    setPreview("");
    setImage(null);
  };

  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  // Add or Edit Testimonial
  const handleSubmit = async () => {
    const isEditing = editing && selectedTestimonial;
    try {
      setLoading((prev) => ({ ...prev, [isEditing ? "update" : "add"]: true })); // Set ADD/UPDATE loading state

      const formData = new FormData();
      formData.append("name", name);
      formData.append("status", status);
      formData.append("feedback", feedback);
      if (image) formData.append("image", image);

      const response = await fetch(
        isEditing ? `/api/routes/testimonials/${selectedTestimonial.id}` : "/api/routes/testimonials",
        {
          method: isEditing ? "PUT" : "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.statusCode === 200 || data.statusCode === 201) {
        fetchTestimonials();
        handleClose();
        setSnackbar({ open: true, message: isEditing ? "Testimonial updated!" : "Testimonial added!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: data.errorMessage || "Operation failed", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Operation failed", severity: "error" });
    } finally {
      setLoading((prev) => ({ ...prev, [isEditing ? "update" : "add"]: false })); // Reset ADD/UPDATE loading state
    }
  };

  // Delete Testimonial
  const handleDelete = async (id) => {
    try {
      setLoading((prev) => ({ ...prev, delete: true })); // Set DELETE loading state

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
      setLoading((prev) => ({ ...prev, delete: false })); // Reset DELETE loading state
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
              disabled={loading.get || loading.add || loading.update || loading.delete || loading.toggleVisibility} // Disable button during any loading state
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
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Feedback</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTestimonials.map((testimonial, index) => (
                <TableRow
                  key={testimonial.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f4f4f4" : "#e0e0e0",
                  }}
                >
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{testimonial.name}</TableCell>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{testimonial.status}</TableCell>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{testimonial.feedback}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(testimonial)}
                      disabled={loading.get || loading.add || loading.update || loading.delete || loading.toggleVisibility} // Disable button during any loading state
                    >
                      <FaRegEdit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(testimonial.id)}
                      disabled={loading.get || loading.add || loading.update || loading.delete || loading.toggleVisibility} // Disable button during any loading state
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

          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <FormControl fullWidth>
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
          <TextField
            fullWidth
            label="Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />

          {preview && (
            <Card sx={{ mt: 2, mb: 2 }}>
              <CardMedia component="img" height="200" image={preview} alt="Preview" />
            </Card>
          )}

          <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>

          <Grid container justifyContent="flex-end">
            <Button onClick={handleClose} color="error" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={loading.add || loading.update} // Disable button during ADD/UPDATE loading state
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