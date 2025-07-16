import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Stack,
} from "@mui/material";

const statuses = ["pending", "in-progress", "completed"];

const ProjectForm = ({ initialData, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "in-progress",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} 
     sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <TextField
          name="title"
          label="Title"
          fullWidth
          required
          value={form.title}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={form.description}
          onChange={handleChange}
        />
        <TextField
          name="status"
          label="Status"
          fullWidth
          select
          value={form.status}
          onChange={handleChange}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initialData ? "Update" : "Add"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProjectForm;
