import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    user: null,
    isAdmin: false
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload
    },
  },
});
export const { setCurrentUser, setIsAdmin } = profileSlice.actions;
export default profileSlice.reducer;
