const express = require("express");
const { isAuthenticated } = require("../authentication/authentication");
const {
  getMyBookings,
  addMyBooking,
  createPaymentIntent,
  cancelBooking,
} = require("../controllers/myBookingsController");

const router = express.Router();

router.get("/", isAuthenticated, getMyBookings);
router.post("/:hotelId/payment-intent", isAuthenticated, createPaymentIntent);
router.post("/create-booking/:hotelId/", isAuthenticated, addMyBooking);
router.put("/:hotelId/:bookingId", isAuthenticated, cancelBooking);

module.exports = router;
