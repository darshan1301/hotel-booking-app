import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myBookings: [],
};

const myBookingsSlice = createSlice({
  name: "myBookings",
  initialState,
  reducers: {
    setBookings(state, action) {
      state.myBookings = action.payload;
    },
    addBooking(state, action) {
      state.myBookings.push(action.payload);
    },
    cancelBooking(state, action) {
      const updatedBookings = state.myBookings.map((hotel) => ({
        ...hotel,
        bookings: hotel.bookings.filter(
          (booking) => booking._id !== action.payload,
        ),
      }));

      state.myBookings = updatedBookings;
    },
    clearBookings(state) {
      state.myBookings = [];
    },
  },
});

export default myBookingsSlice.reducer;

export const { setBookings, addBooking, cancelBooking, clearBookings } =
  myBookingsSlice.actions;

export const getBookings = (state) => state.myBookings.myBookings;
