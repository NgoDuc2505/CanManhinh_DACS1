import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    listUser: []
  },
  reducers: {
    setList: (state, action) => {
    //   console.log("state", state);
    //   console.log("action", action);
      state.listUser = action.payload;
    },
  },
});

export const { setList } = userSlice.actions;

export default userSlice.reducer;
