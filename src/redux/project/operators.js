import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

export const addProject = createAsyncThunk(
  "project/addProject",
  async (formData, { rejectWithValue }) => {
    try {
      // Asigură-te că `formData` este valid înainte de cererea POST
      if (!formData.name || !formData.icon || !formData.background) {
        return rejectWithValue({ message: "All fields are required." });
      }
      const token = localStorage.getItem("token");

      const response = await axios.post("/project/addProject", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        console.error("Network or other error occurred:", error.message);
        return rejectWithValue({
          message: "A network error occurred.",
        });
      }
    }
  }
);

export const getProjects = createAsyncThunk(
  "project/getProjects",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("/project/projects", _, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with an error (e.g., 500, 404, etc.)
        console.error("Error response from server:", error.response.data);
        return rejectWithValue({
          message:
            error.response.data.message ||
            "Failed to load projects from the server.",
          status: error.response.status,
        });
      } else {
        // No response from server, could be network error
        console.error("Network or other error occurred:", error.message);
        return rejectWithValue({
          message: error.message || "A network error occurred.",
        });
      }
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(`/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        return rejectWithValue({
          message:
            error.response.data.message ||
            "Failed to delete the project from the server.",
          status: error.response.status,
        });
      } else {
        console.error("Network or other error occurred:", error.message);
        return rejectWithValue({
          message: error.message || "A network error occurred.",
        });
      }
    }
  }
);

export const editProject = createAsyncThunk(
  "project/editProject",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `/project/${id}`,
        data, // Corpul cererii conține datele pentru actualizare
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        return rejectWithValue({
          message:
            error.response.data.message ||
            "Failed to edit the project on the server.",
          status: error.response.status,
        });
      } else {
        console.error("Network or other error occurred:", error.message);
        return rejectWithValue({
          message: error.message || "A network error occurred.",
        });
      }
    }
  }
);
