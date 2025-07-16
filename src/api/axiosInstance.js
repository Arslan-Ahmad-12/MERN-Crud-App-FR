import axios from "axios";
import { store } from "../app/store";
import { setCredentials, logout } from "../features/auth/authslice";

const API = axios.create({
  baseURL:  process.env.REACT_APP_API_BASE_URL, // base only till /api
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/users/login")
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
           `${process.env.REACT_APP_API_BASE_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );

        store.dispatch(setCredentials({ accessToken: res.data.accessToken }));
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return axios(originalRequest);
      } catch (refreshErr) {
        store.dispatch(logout());
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default API;
