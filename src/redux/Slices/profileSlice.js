import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    user: {},
  },
  reducers: {
    setCurrentUser: (state, action) => {},
  },
});
export const { setCurrentUser } = profileSlice.actions;
export default profileSlice.reducer;
