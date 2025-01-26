import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoading = (state) => state.cards.isLoading;
export const selectError = (state) => state.cards.error;

export const selectCardsByColumn = createSelector(
  // Input selectors
  (state) => state.cards.cardsByColumn,
  (_, columnId) => columnId,
  // Output selector
  (cardsByColumn, columnId) => cardsByColumn[columnId] || []
);
