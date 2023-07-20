import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import driverReducer from "./slices/driverSlice";
import currentRideReducer from "./slices/currentRideSlice";
import personReducer from "./slices/personSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    driver: driverReducer,
    currentRide: currentRideReducer,
    person: personReducer,
  },
});
