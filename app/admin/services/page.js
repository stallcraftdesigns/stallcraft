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
  Modal,
  Box,
  TextField,
  Card,
  CardMedia,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState({
    get: false, // Loading state for fetching services
    add: false, // Loading state for adding a service
    update: false, // Loading state for updating a service
    delete: false, // Loading state for deleting a service
  });
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Fetch services from API
  const fetchServices = async () => {
    try {
      setLoading((prev) => ({ ...prev, get: true })); // Set GET loading state
      const response = await fetch("/api/routes/services");
      const data = await response.json();
      setServices(data.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      setSnackbar({ open: true, message: "Failed to fetch services", severity: "error" });
    } finally {
      setLoading((prev) => ({ ...prev, get: false })); // Reset GET loading state
    }
  };

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Open modal for Add or Edit
  const handleOpen = (service = null) => {
    setEditing(!!service);
    setSelectedService(service);
    setName(service ? service.name : "");
    setShortDescription(service ? service.shortDescription : "");
    setLongDescription(service ? service.longDescription : "");
    setPreview(service ? service.image : "");
    setImage(null);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setName("");
    setShortDescription("");
    setLongDescription("");
    setPreview("");
    setImage(null);
  };

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  // Add or Edit Service
  const handleSubmit = async () => {
    const isEditing = editing && selectedService;
    try {
      setLoading((prev) => ({ ...prev, [isEditing ? "update" : "add"]: true })); // Set ADD/UPDATE loading state

      const formData = new FormData();
      formData.append("name", name);
      formData.append("shortDescription", shortDescription);
      formData.append("longDescription", longDescription);
      if (image) formData.append("image", image);

      const response = await fetch(
        isEditing ? `/api/routes/services/${selectedService.id}` : "/api/routes/services",
        {
          method: isEditing ? "PUT" : "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.statusCode === 200 || data.statusCode === 201) {
        fetchServices();
        handleClose();
        setSnackbar({ open: true, message: isEditing ? "Service updated!" : "Service added!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: data.errorMessage, severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Operation failed", severity: "error" });
    } finally {
      setLoading((prev) => ({ ...prev, [isEditing ? "update" : "add"]: false })); // Reset ADD/UPDATE loading state
    }
  };

  // Open Delete Confirmation Dialog
  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteDialog(true);
  };

  // Close Delete Confirmation Dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialog(false);
    setDeleteId(null);
  };

  // Delete Service
  const handleDelete = async () => {
    try {
      setLoading((prev) => ({ ...prev, delete: true })); // Set DELETE loading state

      const response = await fetch(`/api/routes/services/${deleteId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.statusCode === 201) {
        fetchServices();
        setSnackbar({ open: true, message: "Service deleted!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: data.errorMessage, severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    } finally {
      handleCloseDeleteDialog();
      setLoading((prev) => ({ ...prev, delete: false })); // Reset DELETE loading state
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Services
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          disabled={loading.get || loading.add || loading.update || loading.delete} // Disable button during any loading state
        >
          Add Service
        </Button>
      </Grid>

      {/* Loading State for GET */}
      {loading.get ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : services.length === 0 ? (
        <Typography textAlign="center" sx={{ mt: 4, fontSize: "1.2rem" }}>
          No services available
        </Typography>
      ) : (
        /* Services Table */
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#333" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Short Info</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service, index) => (
                <TableRow
                  key={service.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f4f4f4" : "#e0e0e0",
                  }}
                >
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{service.name}</TableCell>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{service.shortDescription}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(service)}
                      disabled={loading.get || loading.add || loading.update || loading.delete} // Disable button during any loading state
                    >
                      <FaRegEdit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDeleteDialog(service.id)}
                      disabled={loading.get || loading.add || loading.update || loading.delete} // Disable button during any loading state
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
            p: 3,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {editing ? "Edit Service" : "Add Service"}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Short Description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Long Description" value={longDescription} onChange={(e) => setLongDescription(e.target.value)} multiline rows={3} />
            </Grid>
          </Grid>

          {preview && (
            <Card sx={{ mt: 2 }}>
              <CardMedia component="img" height="150" image={preview} />
            </Card>
          )}

          <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Image <input type="file" hidden onChange={handleImageChange} />
          </Button>

          <Grid container justifyContent="flex-end" mt={2}>
            <Button onClick={handleClose} color="error">Cancel</Button>
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

      {/* Delete Confirmation Dialog */}
      <Modal open={deleteDialog} onClose={handleCloseDeleteDialog}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", sm: "40%", md: "30%" },
            bgcolor: "background.paper",
            p: 3,
            boxShadow: 24,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Are you sure?
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
            Do you really want to delete this item? This action cannot be undone.
          </Typography>

          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Button onClick={handleCloseDeleteDialog} variant="outlined" color="primary">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleDelete}
                variant="contained"
                color="error"
                sx={{ color: "white" }}
                disabled={loading.delete} // Disable button during DELETE loading state
              >
                {loading.delete ? <CircularProgress size={24} /> : "Delete"}
              </Button>
            </Grid>
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