import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRide: {
    riderProfilePicture: null,
    riderName: null,
    amountOfTheRide: null,
    pickupPoint: null,
    dropOffPoint: null,
    tripFare: {
      amount: null,
      discount: null,
      totalDue: null,
    },
  },
};

export const currentRideSlice = createSlice({
  name: "currentRide",
  initialState,
  reducers: {
    setCurrentRide: (state, action) => {
      state.currentRide = action.payload;
    },
  },
});

export const { setCurrentRide } = currentRideSlice.actions;

// Selector => To pull current ride data
export const selectCurrentRide = (state) => state.currentRide.currentRide;

export default currentRideSlice.reducer;
