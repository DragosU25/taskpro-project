import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

export const addColumn = createAsyncThunk(
  "column/addColumn",
  async ({ columnName, projectId }, { rejectWithValue }) => {
    try {
      if (!columnName) {
        return rejectWithValue({ message: "Name field is required." });
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/project/columns/${projectId}`,
        { columnName },
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

export const getColumns = createAsyncThunk(
  "column/getColumns",
  async (projectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/project/columns/${projectId}`, {
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

export const editColumn = createAsyncThunk(
  "column/editColumn",
  async ({ columnId, updateData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue({ message: "Authorization token is missing." });
      }

      // Trimite cererea PATCH
      const response = await axios.patch(
        `/project/columns/${columnId}`,
        updateData, // Datele de actualizare
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

export const deleteColumn = createAsyncThunk(
  "columns/deleteColumn",
  async (columnId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`/project/columns/${columnId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting column:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);
