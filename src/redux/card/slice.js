import { createSlice } from "@reduxjs/toolkit";
import { getCards, addCard, editCard, deleteCard, moveCard } from "./operators";

// Inițializăm state-ul
const initialState = {
  cards: {}, // Carduri stocate cu ID-uri unice
  columns: {}, // Coloane care mapază columnId către un array de cardIds
  isLoading: false,
  error: null,
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    resetCardsState: (state) => {
      state.cards = {};
      state.columns = {};
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Cards
      .addCase(getCards.fulfilled, (state, action) => {
        const { columnId, cards } = action.payload;
        state.isLoading = false;

        // Adăugăm cardurile la state
        cards.data.forEach((card) => {
          state.cards[card._id] = card; // Adăugăm cardul în state.cards folosind ID-ul
        });

        if (!state.columns[columnId]) {
          state.columns[columnId] = [];
        }

        // Adăugăm cardId-urile, prevenind duplicarea
        const newCardIds = cards.data.map((card) => card._id);

        // Filtrăm cardurile duplicate
        state.columns[columnId] = [
          ...new Set([...state.columns[columnId], ...newCardIds]), // Set elimină duplicatele
        ];
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
        console.log(action.payload);

        if (
          !action.payload.data ||
          !action.payload.data._id ||
          !action.payload.data.columnId
        ) {
          console.error(
            "Eroare: Cardul nou nu are date valide:",
            action.payload.data
          );
          return;
        }

        state.isLoading = false;

        // Adaugă cardul în `state.cards`
        state.cards[action.payload.data._id] = action.payload.data;

        // Adaugă `cardId` în coloana corespunzătoare
        if (!state.columns[action.payload.data.columnId]) {
          state.columns[action.payload.data.columnId] = [];
        }
        state.columns[action.payload.data.columnId].push(
          action.payload.data._id
        );
      })

      .addCase(addCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || "Unknown error";
      })

      // Edit Card
      .addCase(editCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editCard.fulfilled, (state, action) => {
        const { updatedCard } = action.payload;
        state.isLoading = false;

        // Actualizăm cardul în state
        state.cards[updatedCard._id] = {
          ...state.cards[updatedCard._id], // Cardul existent
          ...updatedCard, // Datele actualizate
        };
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

        const { deletedCard, columnCards } = action.payload.data;

        // Ștergem cardul din state.cards
        delete state.cards[deletedCard];

        // Actualizăm cardurile din coloana respectivă
        const columnId = Object.keys(state.columns).find((colId) =>
          state.columns[colId].includes(deletedCard)
        );

        if (columnId) {
          state.columns[columnId] = columnCards || []; // Sincronizăm cu backend-ul
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
        const { fromColumnId, toColumnId, cardId } = action.payload;
        const normalizedCardId = cardId.toString();

        // Creăm copii pentru referințe noi
        const updatedColumns = { ...state.columns };

        // Eliminăm cardul din coloana sursă
        if (updatedColumns[fromColumnId]) {
          updatedColumns[fromColumnId] = updatedColumns[fromColumnId].filter(
            (id) => id.toString() !== normalizedCardId
          );
        }

        // Adăugăm cardul în coloana destinație
        if (!updatedColumns[toColumnId]) {
          updatedColumns[toColumnId] = [];
        }
        updatedColumns[toColumnId] = [
          ...updatedColumns[toColumnId],
          normalizedCardId,
        ];

        // Înlocuim `state.columns` cu noua referință
        state.columns = updatedColumns;
      })

      .addCase(moveCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || "Unknown error";
      });
  },
});

export const { resetCardsState } = cardsSlice.actions;

export default cardsSlice.reducer;
