import React, { useState } from "react";
import LogoutButton from "./LogoutButton";
import CreateUserDialog from "./CreateUserDialog";
import { useMutation } from "@tanstack/react-query";
import API from "../api/axiosInstance";
import { toast } from "react-toastify";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useCurrentUser } from "../api/projectApi";
import { useSelector } from "react-redux";

const Navbar = ({permissions}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  console.log("permissionsdsf", permissions);

  const user = useSelector((state) => state.auth.user);

  const { mutate: createUser, isLoading } = useMutation({
    mutationFn: async (userData) => {
      const { data } = await API.post("/users/create", userData, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("User created");
      setDialogOpen(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create user");
    },
  });

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5f5", color: "#333", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {permissions.includes("canCreatUser") ? (
            <Button variant="outlined" size="small" onClick={() => setDialogOpen(true)}>
              Create User
            </Button>
          ) : (
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
              Welcome to the Project Management App
            </Typography>
          )}

          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">{user?.name || "User"}</Typography>
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

      <CreateUserDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={(data) => createUser(data)}
        isLoading={isLoading}
      />
    </>
  );
};

export default Navbar;
