import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProjectsPage from "./pages/ProjectsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthGuard from "./components/AuthGuard";
import Navbar from "./components/Navbar";
import Permissions from "./components/Permission";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected route */}
          <Route
            path="/projects"
            element={
              <AuthGuard>
                <Permissions>
                  <Navbar />
                  <ProjectsPage />
                </Permissions>
              </AuthGuard>
            }
          />

          {/* Optionally add a redirect */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>

      <ToastContainer position="top-center" autoClose={3000} />
    </QueryClientProvider>
  );
}

export default App;
