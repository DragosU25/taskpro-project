import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer-ul asociat modulei de autentificare
  },
});

export default store;
