import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL =
  "http://localhost:5000/api" || "https://taskpro-api-ca4u.onrender.com";

// Funcție utilă pentru header-ul de autorizare
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCards = createAsyncThunk(
  "card/getCards",
  async (columnId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/project/columns/cards/${columnId}/getCards`,
        getAuthHeader()
      );

      return { columnId, cards: response.data };
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: "A network error occurred.",
      });
    }
  }
);

export const addCard = createAsyncThunk(
  "card/addCard",
  async ({ cardData, columnId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `project/columns/cards/${columnId}/addCard`,
        cardData,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error adding card:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || {
          message: "A network error occurred.",
        }
      );
    }
  }
);

export const editCard = createAsyncThunk(
  "cards/editCard",
  async ({ updatedData, columnId, cardId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `project/columns/cards/${columnId}/editCard/${cardId}`,
        updatedData,
        getAuthHeader()
      );

      return {
        columnId,
        updatedCard: response.data.data,
      };
    } catch (error) {
      console.error(
        "Error editing card:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || { message: "A network error occurred." }
      );
    }
  }
);

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async ({ columnId, cardId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/project/columns/cards/${columnId}/deleteCard/${cardId}`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error deleting card:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || { message: "Network error" }
      );
    }
  }
);

export const moveCard = createAsyncThunk(
  "cards/moveCard",
  async ({ cardId, fromColumnId, toColumnId }, { rejectWithValue }) => {
    try {
      console.log("Moving card:", { cardId, fromColumnId, toColumnId });

      if (!cardId || !fromColumnId || !toColumnId) {
        throw new Error(
          `Missing required parameters: ${!cardId ? "cardId " : ""}${
            !fromColumnId ? "fromColumnId " : ""
          }${!toColumnId ? "toColumnId" : ""}`
        );
      }

      const response = await axios.patch(
        `/project/columns/cards/move/${fromColumnId}/${cardId}/${toColumnId}`,
        {}, // body gol
        getAuthHeader()
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      console.error(
        "Error moving card:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || { message: "Network error occurred" }
      );
    }
  }
);
