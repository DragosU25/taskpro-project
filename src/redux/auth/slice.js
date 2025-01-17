import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  register,
  resendVerificationEmail,
  updateAvatar,
  updateTheme,
  getCurrentUser,
  updateUser,
} from "./operators";

const initialState = {
  user: {
    _id: null,
    email: null,
    name: null,
    avatar: null,
    theme: "light",
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
      })
      .addCase(resendVerificationEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Resend Email Success:", action.payload);
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Resend Email Error:", action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.result.user;
        state.token = action.payload.result.user.token;
        console.log("login action payload", action.payload);

        if (action.payload.result.user.verify) {
          state.isAuthenticated = true;
          state.isVerified = true;
        } else {
          state.isAuthenticated = false;
          state.isVerified = false;
          state.error =
            "Email-ul nu este verificat. Te rugăm să verifici email-ul."; // Mesaj personalizat
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login = false;
        state.error = action.payload;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user.avatar = action.payload; // Salvează URL-ul avatarului
        console.log(action.payload);
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        console.log("state", action.payload.data);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTheme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.loading = false;
        state.theme = action.payload; // Setează tema returnată din backend
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        console.log("current user", action.payload);

        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setAuth, clearAuth, resetError } = authSlice.actions;
export default authSlice.reducer;
