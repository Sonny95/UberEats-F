import { createSlice, createSelector } from "@reduxjs/toolkit";
import { showAllRestaurants, searchById, searchBySort } from "./restaurantsAction";

const initialState = {
  loading: false,
  restaurantsData: [],
  restaurantSearched: [],
  sort: "",
  error: false,
  success: false,
  message: "",
};

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.loading = false; //reset state
      state.success = false;
      state.error = false;
      state.message = "";
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(showAllRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(showAllRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantsData = action.payload;
        state.success = true;
      })
      .addCase(showAllRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.restaurantsData = [];
      })
      .addCase(searchById.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchById.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantSearched = action.payload;
        state.success = true;
      })
      .addCase(searchById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.restaurantSearched = [];
      })
      .addCase(searchBySort.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchBySort.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantSearched = action.payload;
        state.success = true;
      })
      .addCase(searchBySort.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.restaurantsData = [];
      });
  },
});

// export const selectFoods = createSelector(
//   (state) => state.restaurants.restaurantsData,
//   (restaurantsData) => restaurantsData.foods
// );
export const { reset, setSort } = restaurantsSlice.actions;

export const selectFoods = (state) => state.restaurants.restaurantsData;
// export const sort = (state) => state.restaurants.sort;
// export const error = (state) => state.restaurants.error;
// export const loading = (state) => state.restaurants.loading;

export default restaurantsSlice.reducer;
