import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    user: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload
    },
  },
});
export const { setCurrentUser } = profileSlice.actions;
export default profileSlice.reducer;
