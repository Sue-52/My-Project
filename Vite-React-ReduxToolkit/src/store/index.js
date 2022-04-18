import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterReducer";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    counter: counterReducer,
  }
})

export default store;