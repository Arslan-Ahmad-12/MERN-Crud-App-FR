import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCredentials } from "./authslice";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, { email, password }, { withCredentials: true });

      dispatch(
        setCredentials({
          accessToken: res.data.accessToken,
          user: {
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email,
          },
        })
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

///user registration thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/register`, { name, email, password }, { withCredentials: true });

      dispatch(
        setCredentials({
          accessToken: res.data.accessToken,
          user: {
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email,
          },
        })
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);
