import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./axiosInstance";

// Get Projects
export const useProjects = ({ page, limit, search, sort }) => {
  return useQuery({
    queryKey: ["projects", page, limit, search, sort],
    queryFn: async () => {
      const { data } = await API.get("/projects", {
        params: { page, limit, search, sort },
      });
      return data;
    },
    keepPreviousData: true,
    staleTime: 60000,
  });
};

// Create Project
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => API.post("/projects", data),
    onSuccess: () => queryClient.invalidateQueries(["projects"]),
  });
};

// Update Project
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => API.put(`/projects/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries(["projects"]),
  });
};

// Delete Project
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => API.delete(`/projects/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["projects"]),
  });
};

// Fetch current user info (including permissions)
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await API.get("/users/me");
      return data;
    },
    staleTime: 60000, // 1 minute
    // refetchOnWindowFocus: true, 
  });
};
// Create User
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => API.post("/users/create", userData),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // Optional: if you have a user list
    },
  });
};
