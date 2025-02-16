import { createSelector } from "reselect";

export const selectIsLoading = (state) => state.cards.isLoading;
export const selectError = (state) => state.cards.error;

export const selectCardsByColumn = createSelector(
  (state, columnId) => state.cards.columns[columnId] || [],
  (state) => state.cards.cards,
  (cardIds, allCards) => {
    return cardIds.map((id) => allCards[id]);
  }
);
