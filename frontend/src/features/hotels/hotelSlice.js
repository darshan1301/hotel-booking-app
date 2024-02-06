import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState: initialState,
  reducers: {
    setHotels(state, action) {
      state.hotels = action.payload;
    },
    deleteHotel(state, action) {
      state.hotels = state.hotels.filter((item) => item._id !== action.payload);
    },
    createHotel(state, action) {
      state.hotels.push(action.payload);
    },
    updateHotel(state, action) {
      const updatedHotels = state.hotels.map((hotel) =>
        hotel._id === action.payload.hotelId
          ? { ...hotel, ...action.payload.updatedHotel }
          : hotel,
      );

      // Update the state directly
      state.hotels = updatedHotels;
    },
    clearHotels(state) {
      state.hotels = [];
    },
  },
});

export default hotelSlice.reducer;

export const { setHotels, deleteHotel, createHotel, clearHotels } =
  hotelSlice.actions;

export const getHotels = (state) => state.hotels.hotels;
