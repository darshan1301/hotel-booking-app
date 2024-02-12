import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../features/hotels/hotelSlice";
import myBookingsSlice from "../features/myBookings/myBookingsSlice";

const store = configureStore({
  reducer: {
    hotels: hotelReducer,
    myBookings: myBookingsSlice,
  },
});

export default store;
