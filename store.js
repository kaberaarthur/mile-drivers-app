import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import driverReducer from "./slices/driverSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    driver: driverReducer,
  },
});
