import { configureStore, createSlice } from "@reduxjs/toolkit";
import restaurants from "./features/restaurantsSlice";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    restaurants,
    user: userReducer,
    cart: cartReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});
