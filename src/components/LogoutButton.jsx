import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authslice";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/logout`, {}, {
        withCredentials: true, // Required to send cookies
      });

      dispatch(logout()); // Clears accessToken and user from redux
      toast.success("Logged out successfully!");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      toast.error("Logout failed!");
      console.error(err);
    }
  };

  return (
    <Button variant="outlined" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
