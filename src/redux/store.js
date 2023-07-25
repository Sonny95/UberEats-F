import { configureStore } from "@reduxjs/toolkit";
import restaurants from "./features/restaurantsSlice";
export const store = configureStore({
  reducer: {
    restaurants,
  },
  devTools: process.env.NODE_ENV !== "production",
});
