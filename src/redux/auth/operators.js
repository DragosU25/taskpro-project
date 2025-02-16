import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://taskpro-api-ca4u.onrender.com";

// Helper function to set Authorization header
export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem("token", token);
};

// Function to clear the Authorization header and remove token from localStorage
export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
  localStorage.removeItem("token");
};

// AsyncThunk for registration
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        console.error("Network or other error occurred:", error.message);
        return rejectWithValue({
          message: "An error occurred during registration.",
        });
      }
    }
  }
);

//AsyncThunk for resend verification email

export const resendVerificationEmail = createAsyncThunk(
  "auth/resend-verification-email",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/resend-verification", email);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        console.error("Network or other error occurred:", error.message);
        return rejectWithValue({
          message: "An error occurred during registration.",
        });
      }
    }
  }
);

//AsyncThunk for login

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", userData);
      setAuthHeader(response.data.result.user.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await axios.post("/auth/avatars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.avatarURL;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update avatar" }
      );
    }
  }
);

export const updateTheme = createAsyncThunk(
  "auth/updateTheme",
  async (theme, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "/auth/user",
        { theme },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.theme;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update theme");
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User is not authenticated. Please log in again.");
      }

      const response = await axios.patch("/auth/user", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Update user error:", error);
      return rejectWithValue(
        error.response?.data || "Failed to update user data. Please try again."
      );
    }
  }
);

// Get current user action
export const getCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      setAuthHeader(token);
      const response = await axios.get("/auth/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch current user" }
      );
    }
  }
);

// Logout user action
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      await axios.post("/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      clearAuthHeader();
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Logout failed" }
      );
    }
  }
);
