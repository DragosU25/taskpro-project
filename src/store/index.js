import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice";
import projectReducer from "../redux/project/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
  },
});

export default store;
