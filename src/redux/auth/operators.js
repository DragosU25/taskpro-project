import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

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
      console.log(response);
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
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);
