import { createSlice } from "@reduxjs/toolkit";
import { register } from "./operators";

const initialState = {
  user: {
    _id: null,
    email: null,
    name: null,
  },
  verificationToken: null,
  isAuthenticated: false,
  isVerified: false, // Utilizatorul și-a verificat emailul?
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.result.user;
      state.isAuthenticated = true;
      state.isVerified = action.payload.result.user.verified || false;
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isVerified = false;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.user = action.payload.result.user;
        state.verificationToken = action.payload.result.user.verificationToken;
        state.isAuthenticated = false; // Setăm explicit autentificarea la `false` după înregistrare
        state.isVerified = false;

        console.log("Register Success:", action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Register Error:", action.payload);
      });
  },
});

export const { setAuth, clearAuth, resetError } = authSlice.actions;
export default authSlice.reducer;
