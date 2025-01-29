import { createSelector } from "reselect";

export const selectIsLoading = (state) => state.cards.isLoading;
export const selectError = (state) => state.cards.error;

// Memoized selector
export const selectCardsByColumn = createSelector(
  (state, columnId) => state.cards.columns[columnId] || [], // Get the card IDs for the column
  (state) => state.cards.cards, // Get the cards data
  (cardIds, allCards) => {
    return cardIds.map((id) => allCards[id]); // Map the IDs to the card details
  }
);
