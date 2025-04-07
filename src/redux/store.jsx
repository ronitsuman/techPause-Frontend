import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice"; // Auth Slice import kar rahe hain
import blogReducer from "./blogSlice"

const store = configureStore({
  reducer: {
    auth: authReducer, // Authentication reducer
    blogs:blogReducer
  },
});

export default store; 