import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice"
import profileSlice from "./Slices/profileSlice";
export default configureStore({
  reducer: {
    userListSlice: userSlice,
    profileSlice: profileSlice
  },
});
