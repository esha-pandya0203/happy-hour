import { createSlice } from "@reduxjs/toolkit";
import users from '../Database/users.json'; 

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
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    }
  },
});
export const { setCurrentUser, addUser, clearCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
