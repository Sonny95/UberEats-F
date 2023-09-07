import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// show all restaurants

export const showAllRestaurants = createAsyncThunk(
  "restaurants/showAll",
  async (sort, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8000/foods`, {
        params: { filter: sort.toLowerCase() },
      });
      return response.data;
    } catch (err) {
      const message = (err.response && err.response.data) || err.message;

      return thunkAPI.rejectWithValue(message); //send message when it's fail as payload
    }
  }
);

//detail
export const searchById = createAsyncThunk("restaurants/searchById", async (id, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:8000/restaurantDetail/${id}`);

    return response.data;
  } catch (err) {
    const message = (err.response && err.response.data) || err.message;

    return thunkAPI.rejectWithValue(message);
  }
});

//search

export const searchBySort = createAsyncThunk("restaurants/searchBySort", async (sort, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:8000/foods`);
    return response.data;
  } catch (err) {
    const message = (err.response && err.response.data) || err.message;

    return thunkAPI.rejectWithValue(message);
  }
});
