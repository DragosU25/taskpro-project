export const selectIsLoading = (state) => state.cards.isLoading;
export const selectError = (state) => state.cards.error;

// export const selectCardsByColumn = createSelector(
//   // Input selectors
//   (state) => state.cards.cardsByColumn,
//   (_, columnId) => columnId,
//   // Output selector
//   (cardsByColumn, columnId) => cardsByColumn[columnId] || []
// );

export const selectCardsByColumn = (state, columnId) => {
  const cardIds = state.cards.columns[columnId] || []; // Obține ID-urile cardurilor din coloană
  return cardIds.map((id) => state.cards.cards[id]); // Mapăm ID-urile către detaliile cardurilor
};
