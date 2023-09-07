import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLogin: false };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction(state, action) {
      state.isLogin = action.payload;
    },
    logoutAction(state) {
      state.isLogin = false;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
