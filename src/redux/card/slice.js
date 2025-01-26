import { createSlice } from "@reduxjs/toolkit";
import { getCards, addCard, editCard, deleteCard, moveCard } from "./operators";

const initialState = {
  cardsByColumn: {}, // Stocăm cardurile pentru fiecare coloană
  isLoading: false,
  error: null,
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    resetCardsState: (state) => {
      state.cardsByColumn = {
        columnId: null,
      };
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Cards
      .addCase(getCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        const { columnId, cards } = action.payload;
        state.isLoading = false;
        state.cardsByColumn[columnId] = cards;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || "Unknown error";
      })

      // Add Card
      .addCase(addCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        const { columnId, newCard } = action.payload.data;

        state.isLoading = false;

        // Verificăm dacă `columnId` există în `cardsByColumn`, altfel îl inițializăm
        if (!Array.isArray(state.cardsByColumn[columnId])) {
          state.cardsByColumn[columnId] = []; // Inițializare ca array gol
        }

        // Adăugăm cardul nou la array-ul coloanei
        state.cardsByColumn[columnId].push(newCard);
        console.log("cards by column", state.cardsByColumn);
      })

      // Edit Card
      .addCase(editCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editCard.fulfilled, (state, action) => {
        const { columnId, updatedCard } = action.payload;
        console.log(action.payload);
        state.isLoading = false;

        // Verificăm dacă `columnId` există în `cardsByColumn`
        if (Array.isArray(state.cardsByColumn[columnId])) {
          // Găsim indexul cardului de actualizat
          const index = state.cardsByColumn[columnId].findIndex(
            (card) => card._id === updatedCard._id
          );

          if (index !== -1) {
            // Actualizăm cardul în array-ul corespunzător
            state.cardsByColumn[columnId] = state.cardsByColumn[columnId].map(
              (card) =>
                card._id === updatedCard._id
                  ? { ...card, ...updatedCard }
                  : card
            );
          }
        }
      })
      .addCase(editCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || "Unknown error";
      })

      // Delete Card
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.isLoading = false;

        const { columnId, deletedCard } = action.payload.data;

        // Verificăm dacă `columnId` există în state
        if (Array.isArray(state.cardsByColumn[columnId])) {
          // Filtrăm cardurile pentru a elimina cardul șters
          state.cardsByColumn[columnId] = state.cardsByColumn[columnId].filter(
            (card) => card._id !== deletedCard
          );

          console.log(`Card ${deletedCard} deleted from column ${columnId}`);
        } else {
          console.error(`Column ${columnId} not found in state`);
        }
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || "Unknown error";
      })

      // Move Card
      .addCase(moveCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cards = action.payload || state.cards; // Fallback dacă backend-ul nu trimite lista completă
      })
      .addCase(moveCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || "Unknown error";
      });
  },
});

export const { resetCardsState } = cardsSlice.actions;

export default cardsSlice.reducer;
