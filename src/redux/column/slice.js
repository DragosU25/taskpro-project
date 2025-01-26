import { createSlice } from "@reduxjs/toolkit";
import { addColumn, getColumns, editColumn, deleteColumn } from "./operators";

const initialState = {
  columns: [],
  isLoading: false,
  error: null,
};

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    resetColumnsState: (state) => {
      state.columns = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add Column
    builder
      .addCase(addColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns.push(action.payload);
      })
      .addCase(addColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Get Columns
    builder
      .addCase(getColumns.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getColumns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns = action.payload.columns;
      })
      .addCase(getColumns.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Edit Column
    builder
      .addCase(editColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedColumn = action.payload;
        const index = state.columns.findIndex(
          (col) => col._id === updatedColumn._id
        );
        if (index !== -1) {
          state.columns[index] = updatedColumn;
        }
      })
      .addCase(editColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedColumnId = action.meta.arg; // ID-ul coloanei șterse
        state.columns = state.columns.filter(
          (column) => column._id !== deletedColumnId
        );
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || "Unknown error";
      });
  },
});

export const { resetColumnsState } = columnsSlice.actions;

export default columnsSlice.reducer;
