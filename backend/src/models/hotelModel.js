const mongoose = require("mongoose");
const { Booking } = require("./bookingModel");

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming User is the model name for users
    required: true,
  },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true, default: "family" },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, default: 0 },
  facilities: [String],
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, default: 1, min: 1, max: 5 },
  imageUrls: [String],
  lastUpdated: { type: Date, required: true },
  bookings: [],
});

const Hotel = new mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
