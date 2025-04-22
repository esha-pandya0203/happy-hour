import { createSlice } from "@reduxjs/toolkit";
import { users } from '../Database';

const initialState = {
  users: users,
  currentUser: null,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    }
  },
});
export const { setCurrentUser, addUser } = accountSlice.actions;
export default accountSlice.reducer;