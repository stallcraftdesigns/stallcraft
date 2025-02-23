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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]); // For filtered brands
  const [loading, setLoading] = useState({
    get: false, // Loading state for fetching brands
    add: false, // Loading state for adding a brand
    update: false, // Loading state for updating a brand
    delete: false, // Loading state for deleting a brand
  });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("active"); // Default status
  const [preview, setPreview] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [filter, setFilter] = useState("all"); // Filter state for status

  // Fetch brands from API
  const fetchBrands = async () => {
    try {
      setLoading((prev) => ({ ...prev, get: true })); // Set GET loading state
      const response = await fetch("/api/routes/brands");
      const data = await response.json();
      setBrands(data.data || []);
      setFilteredBrands(data.data || []); // Initialize filtered brands
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to fetch brands", severity: "error" });
    } finally {
      setLoading((prev) => ({ ...prev, get: false })); // Reset GET loading state
    }
  };

  // Fetch brands on component mount
  useEffect(() => {
    fetchBrands();
  }, []);

  // Filter brands based on status
  useEffect(() => {
    if (filter === "all") {
      setFilteredBrands(brands);
    } else {
      setFilteredBrands(brands.filter((brand) => brand.status === filter));
    }
  }, [filter, brands]);

  // Handle Add/Update Brand
  const handleSubmit = async () => {
    const isEditing = editing && selectedBrand;
    try {
      setLoading((prev) => ({ ...prev, [isEditing ? "update" : "add"]: true })); // Set ADD/UPDATE loading state

      const formData = new FormData();
      formData.append("title", title);
      formData.append("status", status); // Add status to the form data
      if (image) formData.append("image", image);

      const response = await fetch(
        isEditing ? `/api/routes/brands/${selectedBrand.id}` : "/api/routes/brands",
        {
          method: isEditing ? "PUT" : "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.statusCode === 200 || data.statusCode === 201) {
        fetchBrands(); // Refresh the list
        handleClose();
        setSnackbar({ open: true, message: isEditing ? "Brand updated!" : "Brand added!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: data.errorMessage || "Operation failed", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Operation failed", severity: "error" });
    } finally {
      setLoading((prev) => ({ ...prev, [isEditing ? "update" : "add"]: false }));
    }
  };

  // Open Delete Confirmation Modal
  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setDeleteDialog(true);
  };

  // Handle Delete Brand
  const handleDelete = async () => {
    try {
      setLoading((prev) => ({ ...prev, delete: true })); // Set DELETE loading state

      const response = await fetch(`/api/routes/brands/${deleteId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        setBrands(brands.filter((b) => b.id !== deleteId));
        setSnackbar({ open: true, message: "Brand deleted!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: data.errorMessage || "Delete failed", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    } finally {
      setDeleteDialog(false);
      setLoading((prev) => ({ ...prev, delete: false })); // Reset DELETE loading state
    }
  };

  // Open modal for Add/Edit
  const handleOpen = (brand = null) => {
    setEditing(!!brand);
    setSelectedBrand(brand);
    setTitle(brand ? brand.title : "");
    setStatus(brand ? brand.status : "active"); // Initialize status
    setPreview(brand ? brand.image : "");
    setImage(null);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setImage(null);
    setPreview("");
    setStatus("active"); // Reset status to default
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Grid container alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Brands
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
              Add Brand
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Loading State for GET */}
      {loading.get ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredBrands.length === 0 ? (
        <Typography textAlign="center" sx={{ mt: 4, fontSize: "1.2rem" }}>
          No brands available
        </Typography>
      ) : (
        /* Brands Table */
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#333" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBrands.map((brand, index) => (
                <TableRow key={brand.id} sx={{ backgroundColor: index % 2 === 0 ? "#f4f4f4" : "#e0e0e0" }}>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{brand.title}</TableCell>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{brand.status}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(brand)}
                      disabled={loading.get || loading.add || loading.update || loading.delete}
                    >
                      <FaRegEdit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDelete(brand.id)}
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
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {editing ? "Edit Brand" : "Add Brand"}
          </Typography>
          <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} margin="normal" />
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
            <Button onClick={handleClose} color="error" sx={{ mr: 2 }}>Cancel</Button>
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

      {/* Delete Confirmation Modal */}
      <Modal open={deleteDialog} onClose={() => setDeleteDialog(false)}>
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
              <Button onClick={() => setDeleteDialog(false)} variant="outlined" color="primary">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleDelete}
                variant="contained"
                color="error"
                sx={{ color: "white" }}
                disabled={loading.delete}
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