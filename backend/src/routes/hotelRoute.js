const express = require("express");
const {
  getHotels,
  getSearchHotels,
  getHotelDetails,
  bookingPaymentIntent,
} = require("../controllers/hotelsController");

const router = express.Router();

////Routes without Auth
router.get("/", getHotels); //gd
router.get("/:hotelId", getHotelDetails); //gd
router.post("/search", getSearchHotels);

module.exports = router;

//gd == GOOD
