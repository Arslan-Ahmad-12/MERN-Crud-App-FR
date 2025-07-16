import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage, setSearch, setSort } from "../features/project/projectSlice";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "../api/projectApi";
import ProjectForm from "../components/ProjectForm";
import { toast } from "react-toastify";

const ProjectsPage = () => {
  const dispatch = useDispatch();

  // Redux state
  const page = useSelector((state) => state.project.page);
  const search = useSelector((state) => state.project.search);
  const sortOrder = useSelector((state) => state.project.sort);

  // Local state for UI only
  const [projects, setProjects] = useState([]);
  const [limit, setLimit] = useState(5);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [total, setTotal] = useState(0);

  const { mutate: createProject } = useCreateProject();
  const { mutate: updateProject } = useUpdateProject();
  const { mutate: deleteProject } = useDeleteProject();

  // Fetch projects using custom hook
  const { data, loading } = useProjects({
    page,
    limit,
    search,
    sort: sortOrder,
  });

  // if(data.message) {
  //   toast.error(data.message);
  // }

  // Use data from the hook
  useEffect(() => {
    if (data) {
      setProjects(data.data || []);
      setTotal(data.total || 0);
    }
  }, [data]);

  const handleAddClick = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEditClick = (project) => {
    setEditData(project);
    setOpen(true);
  };

  // Handle form submit
  const handleSubmit = (formData) => {
    if (editData) {
      updateProject(
        { id: editData._id, data: formData },
        {
          onSuccess: () => {
            toast.success("Project updated Successfully!");
            setOpen(false);
          },
        }
      );
    } else {
      createProject(formData, {
        onSuccess: () => {
          toast.success("Project created Successfully!");
          setOpen(false);
        },
      });
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    deleteProject(id, {
      onSuccess: () => toast.success("Project deleted Successfully!"),
    });
  };
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ minWidth: 120 }}>
          Projects
        </Typography>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: { xs: 1, sm: 0 },
          }}
        >
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
              dispatch(setPage(1));
            }}
            style={{
              width: 250,
              height: 40,
              padding: "8px 12px",
              borderRadius: 4,
              border: "1px solid #ccc",
              fontSize: 16,
              boxSizing: "border-box",
            }}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{
            height: 40,
            minWidth: 120,
            fontSize: 16,
            alignSelf: { xs: "stretch", sm: "center" },
          }}
          onClick={handleAddClick}
        >
          Add Project
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 3, minHeight: 200 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell sx={{ width: "100px" }}>
                  Created At
                  <IconButton
                    size="small"
                    onClick={() => {
                      dispatch(setSort(sortOrder === "asc" ? "desc" : "asc"));
                      dispatch(setPage(1));
                    }}
                  >
                    {sortOrder === "asc" ? (
                      <ArrowUpward fontSize="inherit" />
                    ) : (
                      <ArrowDownward fontSize="inherit" />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell sx={{ width: "100px" }}>Updated At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="h6" color="text.secondary">
                      No Data Found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project?._id}>
                    <TableCell>{project?.title}</TableCell>
                    <TableCell>{project?.description}</TableCell>
                    <TableCell>{project?.status}</TableCell>
                    <TableCell>
                      {new Date(project?.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(project?.updatedAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton onClick={() => handleEditClick(project)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(project?._id)}>
                          <Delete color="error" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
        <TablePagination
          component="div"
          count={total}
          page={page - 1}
          onPageChange={(event, newPage) => dispatch(setPage(newPage + 1))}
          rowsPerPage={limit}
          onRowsPerPageChange={(e) => {
            setLimit(parseInt(e.target.value, 10));
            dispatch(setPage(1));
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "500px",
            maxWidth: "90%",
          },
        }}
      >
        <DialogTitle>{editData ? "Edit Project" : "Add Project"}</DialogTitle>
        <DialogContent>
          <ProjectForm
            initialData={editData}
            onSubmit={handleSubmit}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProjectsPage;
