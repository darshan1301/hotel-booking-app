const Hotel = require("../models/hotelModel");

const checkHotelOwnership = async (req, res, next) => {
  const { hotelId } = req.params;
  const { userId } = req.user;
  console.log(hotelId, userId);

  try {
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    if (hotel.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this hotel" });
    }

    next();
  } catch (error) {
    console.error("Error checking hotel ownership:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  checkHotelOwnership,
};
