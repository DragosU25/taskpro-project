import { createSlice } from "@reduxjs/toolkit";
import { getCards, addCard, editCard, deleteCard, moveCard } from "./operators";

const initialState = {
  cards: {},
  columns: {},
  isLoading: false,
  error: null,
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    resetCardsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get Cards
      .addCase(getCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        const { columnId, cards } = action.payload;
        console.log(cards);

        // Update cards
        cards.data.forEach((card) => {
          state.cards[card._id] = card;
        });

        // Update column
        state.columns[columnId] = cards.data.map((card) => card._id);
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add Card
      .addCase(addCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.isLoading = false;
        const card = action.payload.data;

        state.cards[card._id] = card;
        if (!state.columns[card.columnId]) {
          state.columns[card.columnId] = [];
        }
        state.columns[card.columnId].push(card._id);
      })
      .addCase(addCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Edit Card
      .addCase(editCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editCard.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedCard = action.payload.data;
        state.cards[updatedCard._id] = updatedCard;
      })
      .addCase(editCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Move Card
      .addCase(moveCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        state.isLoading = false;
        const { fromColumn, toColumn } = action.payload.data;

        // Update columns
        state.columns[fromColumn._id] = fromColumn.columnCards.map(
          (card) => card._id
        );
        state.columns[toColumn._id] = toColumn.columnCards.map(
          (card) => card._id
        );

        // Update cards
        [...fromColumn.columnCards, ...toColumn.columnCards].forEach((card) => {
          state.cards[card._id] = card;
        });
      })
      .addCase(moveCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Card
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.isLoading = false;
        const { deletedCardId, columnCards } = action.payload.data;

        // Find and update the affected column
        const columnId = Object.keys(state.columns).find((colId) =>
          state.columns[colId].includes(deletedCardId)
        );

        if (columnId) {
          state.columns[columnId] = columnCards;
          delete state.cards[deletedCardId];
        }
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCardsState } = cardSlice.actions;
export default cardSlice.reducer;
