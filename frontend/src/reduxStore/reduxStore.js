import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../features/hotels/hotelSlice";

const store = configureStore({
  reducer: {
    hotels: hotelReducer,
  },
});

export default store;
