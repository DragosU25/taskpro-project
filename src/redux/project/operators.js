import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://taskpro-api-ca4u.onrender.com";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const addProject = createAsyncThunk(
  "project/addProject",
  async (formData, { rejectWithValue }) => {
    try {
      if (!formData.name || !formData.icon || !formData.background) {
        return rejectWithValue({ message: "All fields are required." });
      }

      const response = await axios.post(
        "/project/addProject",
        formData,
        getAuthHeader()
      );
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
      const response = await axios.get("/project/projects", _, getAuthHeader());

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        return rejectWithValue({
          message:
            error.response.data.message ||
            "Failed to load projects from the server.",
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

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/project/${id}`, getAuthHeader());
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
      const response = await axios.patch(
        `/project/${id}`,
        data,
        getAuthHeader()
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
