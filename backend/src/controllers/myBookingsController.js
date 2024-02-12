const Booking = require("../models/bookingModel");
const Hotel = require("../models/hotelModel");
require("dotenv").config();
const Stripe = require("stripe");
const { v4: uuidv4 } = require("uuid");
const stripe = new Stripe(process.env.STRIPE_SK.toString());

const getMyBookings = async (req, res) => {
  const { userId, email } = req.user;
  // console.log("GET My BOOKINGS", userId);
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { email: `${email}` } },
    });

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === userId
      );

      const hotelWithUserBookings = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });
    // console.log(results);

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
};

const createPaymentIntent = async (req, res) => {
  // console.log("CREATE PAYMENT INTENT");
  const hotelId = req.params.hotelId;
  const userId = req.user.userId;
  const { dateRange } = req.body;

  const getTotalNights = (dateRanges) => {
    if (dateRanges.length === 0) {
      return 0;
    }

    const convertedStartDate = new Date(dateRanges[0].startDate);
    const convertedEndDate = new Date(dateRanges[0].endDate);

    const timeDiff = convertedEndDate - convertedStartDate;
    const nightCount = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return nightCount;
  };

  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found!" });
    }

    const totalNights = getTotalNights(dateRange);

    const totalCost = totalNights * hotel.pricePerNight * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost,
      shipping: {
        name: "Jenny Rosen",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
      currency: "usd",
      description: hotel.name,
      metadata: {
        userId,
        hotelId,
      },
    });

    if (!paymentIntent.client_secret)
      return res
        .status(500)
        .json({ message: "Error creating payment intent." });

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
      totalNights,
    };
    // console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

const addMyBooking = async (req, res) => {
  const hotelId = req.params.hotelId;
  const { userId, email } = req.user;
  const bookingData = req.body;
  // console.log(req.body);
  try {
    const paymentIntentId = bookingData.paymentIntent.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId.toString()
    );

    if (
      userId !== paymentIntent.metadata.userId ||
      hotelId !== paymentIntent.metadata.hotelId
    ) {
      return res.status(400).json({ message: "Payment intent mismatched!" });
    }

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment intent failed." });
    }

    // Generate a unique identifier
    const uniqueId = uuidv4();

    const newBooking = {
      _id: uniqueId,
      userId: userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: email,
      adultCount: req.body.adultCount,
      childCount: req.body.childCount,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      totalCost: paymentIntent.amount,
    };
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.hotelId,
      {
        $push: { bookings: newBooking },
      },
      { new: true } // This option returns the modified document
    );

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong!" });
  }
};

const cancelBooking = async (req, res) => {
  const hotelId = req.params.hotelId;
  const bookingId = req.params.bookingId;
  // console.log("CANCEL BOOKING", hotelId, bookingId);
  try {
    // Check if the hotel exists
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Check if the booking exists in the hotel's bookings array
    const isBookingInHotel = hotel.bookings.some(
      (booking) => booking._id === bookingId
    );
    if (!isBookingInHotel) {
      return res
        .status(404)
        .json({ message: "Booking not found in the hotel" });
    }
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $pull: { bookings: { _id: bookingId.toString() } } },
      { new: true }
    );

    return res.status(200).json({ message: "Booking removed from the hotel" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getMyBookings,
  addMyBooking,
  createPaymentIntent,
  cancelBooking,
};
