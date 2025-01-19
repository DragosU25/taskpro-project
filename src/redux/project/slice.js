import { createSlice } from "@reduxjs/toolkit";
import { addProject, deleteProject, getProjects } from "./operators";

const initialState = {
  project: [
    {
      name: null,
      icon: null,
      background: null,
    },
  ],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetProjectState: (state) => {
      state.project = {
        name: null,
        icon: null,
        background: null,
      };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project.push(action.payload.data);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An unknown error occurred.";
      })
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload.data.projects;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An unknown error occurred.";
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        // Elimină proiectul șters din lista proiectelor
        state.project = state.project.filter(
          (project) => project._id !== action.meta.arg
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to delete the project.";
      });
  },
});

export const { resetProjectState } = projectSlice.actions;

export default projectSlice.reducer;
