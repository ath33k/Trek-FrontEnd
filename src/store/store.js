import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export const storeR = configureStore({
  reducer: rootReducer,
});

export default storeR;
