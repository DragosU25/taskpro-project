import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

export const getCards = createAsyncThunk(
  "card/getCards",
  async (columnId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `/project/columns/cards/${columnId}/getCards`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { columnId, cards: response.data }; // Adaugă columnId la răspuns
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({
          message: "A network error occurred.",
        });
      }
    }
  }
);

export const addCard = createAsyncThunk(
  "card/addCard",
  async ({ cardData, columnId }, rejectWithValue) => {
    try {
      const token = localStorage.getItem("token");

      // Trimite cardData corect în corpul request-ului
      const response = await axios.post(
        `project/columns/cards/${columnId}/addCard`,
        cardData, // cardData trimis direct aici
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        console.error("Network or other error occurred:", error.message);
        return rejectWithValue({
          message: "A network error occurred.",
        });
      }
    }
  }
);

export const editCard = createAsyncThunk(
  "cards/editCard",
  async ({ updatedData, columnId, cardId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `project/columns/cards/${columnId}/editCard/${cardId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        columnId,
        updatedCard: response.data.data, // Preia corect cardul actualizat din `data`
      };
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "A network error occurred." });
    }
  }
);

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async ({ columnId, cardId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `/project/columns/cards/${columnId}/deleteCard/${cardId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
  "card/moveCard",
  async ({ fromColumnId, cardId, toColumnId }, { rejectWithValue }) => {
    console.log(fromColumnId, cardId, toColumnId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `project/columns/cards/${fromColumnId}/moveCard/${cardId}/${toColumnId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        console.error("Network or other error occurred:", error.message);
        return rejectWithValue({
          message: "A network error occurred.",
        });
      }
    }
  }
);
