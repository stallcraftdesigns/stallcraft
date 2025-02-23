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
  Modal,
  Box,
  Select,
  MenuItem,
  FormControl,
  Button,
  Grid,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { FaRegEdit } from "react-icons/fa";


// API Helper Function
const fetchLeads = async () => {
  try {
    const response = await fetch("/api/routes/leads");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
};

export default function LeadPage() {
  const [leads, setLeads] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Fetch Leads from API
  useEffect(() => {
    async function loadLeads() {
      const data = await fetchLeads();
      setLeads(data);
    }
    loadLeads();
  }, []);

  // Open Modal
  const handleOpen = (lead) => {
    setSelectedLead(lead);
    setNewStatus(lead.status);
    setOpen(true);
  };

  // Close Modal
  const handleClose = () => {
    setOpen(false);
    setSelectedLead(null);
  };

  // Update Lead Status (API)
  const handleUpdateStatus = async () => {
    if (!selectedLead) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/routes/leads/${selectedLead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedLead.id, status: newStatus }),
      });

      const result = await response.json(); // Parse response body

      if (result.statusCode == 201) { // Check success
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === selectedLead.id ? { ...lead, status: newStatus } : lead
          )
        );
        setSnackbarOpen(true);
      } else {
        console.error("Failed to update lead status:", result.errorMessage || "Unknown error");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  // Filter Leads
  const filteredLeads = filterStatus
    ? leads.filter((lead) => lead.status === filterStatus)
    : leads;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Top Section */}
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Leads
        </Typography>
        <FormControl sx={{ minWidth: 180 }}>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            fullWidth
            displayEmpty
            sx={{
              background: "#fff",
              borderRadius: 2,
              "& .MuiSelect-select": { py: 1 },
            }}          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="contacted">Contacted</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Leads Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Message</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {filteredLeads.length > 0 ? (
    filteredLeads.map((lead) => (
      <TableRow key={lead.id}>
        <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{lead.name}</TableCell>
        <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{lead.email}</TableCell>
        <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{lead.phoneNo}</TableCell>
        <TableCell sx={{ fontSize: "1.1rem", fontWeight: "500" }}>{lead.message}</TableCell>
        <TableCell>
          <Chip
            label={lead.status}
            color={lead.status === "New" ? "primary" : "secondary"}
            sx={{ fontWeight: "bold", fontSize: "1rem", px: 1 }}
          />
        </TableCell>
        <TableCell>
          <IconButton onClick={() => handleOpen(lead)} color="primary">
            <FaRegEdit fontSize="lg" />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} align="center" sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "gray" }}>
        No leads available.
      </TableCell>
    </TableRow>
  )}
</TableBody>


        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2} fontWeight="bold">
            Edit Lead Status
          </Typography>
          <FormControl fullWidth>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              fullWidth
              displayEmpty
              sx={{ background: "#fff", borderRadius: 2 }}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Contacted">Contacted</MenuItem>
            </Select>
          </FormControl>
          <Grid container justifyContent="flex-end" mt={3}>
            <Button onClick={handleClose} color="error" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateStatus}
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </Grid>
        </Box>
      </Modal>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
          Lead status updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
