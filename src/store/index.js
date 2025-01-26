import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice";
import projectReducer from "../redux/project/slice";
import columnsReducer from "../redux/column/slice";
import cardsReducer from "../redux/card/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    columns: columnsReducer,
    cards: cardsReducer,
  },
});

export default store;
