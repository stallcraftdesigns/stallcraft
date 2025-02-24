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

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [loading, setLoading] = useState({
    get: false, // Loading state for fetching portfolios
    add: false, // Loading state for adding a portfolio
    update: false, // Loading state for updating a portfolio
    delete: false, // Loading state for deleting a portfolio
  });
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("active"); // Default status
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [filter, setFilter] = useState("all"); // Filter state for status


  // Fetch portfolios from API
  const fetchPortfolio = async () => {
    try {
      setLoading((prev) => ({ ...prev, get: true })); // Set GET loading state
      const response = await fetch("/api/routes/portfolio");
      const data = await response.json();
      setPortfolios(data.data || []);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      setSnackbar({ open: true, message: "Failed to fetch portfolios", severity: "error" });
    } finally {
      setLoading((prev) => ({ ...prev, get: false })); // Reset GET loading state
    }
  };

  // Fetch portfolios on component mount
  useEffect(() => {
    fetchPortfolio();
  }, []);

  // Fetch portfolio on component mount
  useEffect(() => {
    if (filter === "all") {
      setFilteredPortfolios(portfolios);
    } else {
      setFilteredPortfolios(portfolios?.filter((portfolio) => portfolio.status === filter));
    }
  }, [filter, portfolios]);

  // Open modal for Add/Edit
  const handleOpen = (portfolio = null) => {
    setEditing(!!portfolio);
    setSelectedPortfolio(portfolio);
    setTitle(portfolio ? portfolio.title : "");
    setStatus(portfolio ? portfolio.status : "active"); // Default status
    setPreview(portfolio ? portfolio.image : "");
    setImage(null);
    setOpen(true);
  };

  // Close Add/Edit modal
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setStatus(""); // Default status
    setPreview("");
    setImage(null);
  };

  // Open Delete Confirmation Modal
  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  // Close Delete Modal
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteId(null);
  };

  // Handle Image Selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  // Add or Edit Portfolio
  const handleSubmit = async () => {
    const isEditing = editing && selectedPortfolio;
    try {
      setLoading((prev) => ({ ...prev, [isEditing ? "update" : "add"]: true })); // Set ADD/UPDATE loading state

      const formData = new FormData();
      formData.append("title", title);
      formData.append("status", status);
      if (image) formData.append("image", image);

      const response = await fetch(
        isEditing ? `/api/routes/portfolio/${selectedPortfolio.id}` : "/api/routes/portfolio",
        {
          method: isEditing ? "PUT" : "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.statusCode === 200 || data.statusCode === 201) {
        fetchPortfolio();
        handleClose();
        setSnackbar({ open: true, message: isEditing ? "Portfolio updated!" : "Portfolio added!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: data.errorMessage, severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Operation failed", severity: "error" });
    } finally {
      setLoading((prev) => ({ ...prev, [isEditing ? "update" : "add"]: false })); // Reset ADD/UPDATE loading state
    }
  };

  // Confirm Delete Portfolio
  const handleDeleteConfirm = async () => {
    try {
      setLoading((prev) => ({ ...prev, delete: true })); // Set DELETE loading state

      const response = await fetch(`/api/routes/portfolio/${deleteId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.statusCode === 201) {
        fetchPortfolio();
        setSnackbar({ open: true, message: "Portfolio deleted!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: data.errorMessage, severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    } finally {
      handleDeleteClose();
      setLoading((prev) => ({ ...prev, delete: false })); // Reset DELETE loading state
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Grid container alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Portfolio
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
              Add Portfolio
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Loading State for GET */}
      {loading.get ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredPortfolios.length === 0 ? (
        <Typography textAlign="center" sx={{ mt: 4, fontSize: "1.2rem" }}>
          No portfolios available
        </Typography>
      ) : (
        /* Portfolio Table */
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
              {filteredPortfolios.map((portfolio, index) => (
                <TableRow
                  key={portfolio.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f4f4f4" : "#e0e0e0",
                  }}
                >
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{portfolio.title}</TableCell>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{portfolio.status}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(portfolio)}
                      disabled={loading.get || loading.add || loading.update || loading.delete} // Disable button during any loading state
                    >
                      <FaRegEdit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteOpen(portfolio.id)}
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
            width: { xs: "90%", sm: "50%", md: "30%" },
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {editing ? "Edit Portfolio" : "Add Portfolio"}
          </Typography>

          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
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
           <Typography mt={1} mb={1} color="green">
              Image should be 600x400 pixels...
            </Typography>
          {/* Image Preview */}
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

      {/* Delete Confirmation Modal */}
      <Modal open={deleteOpen} onClose={handleDeleteClose}>
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
              <Button onClick={handleDeleteClose} variant="outlined" color="primary">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleDeleteConfirm}
                variant="contained"
                color="error"
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