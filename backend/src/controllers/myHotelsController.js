const Hotel = require("../models/hotelModel");
const {
  uploadCloudinary,
  deleteArrayOfImagesFromCloudinary,
  extractPublicIds,
} = require("../utils/cloudinary");
const mongoose = require("mongoose");
const NodeCache = require("node-cache");

const nodeCache = new NodeCache({
  stdTTL: 60 * 60 * 24,
});

function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const addMyHotel = async (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).send(req.fileValidationError);
  }
  const files = req.files;
  try {
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        return await uploadCloudinary(file.path);
      })
    );
    const newHotel = new Hotel({
      userId: req.user.userId,
      name: capitalizeString(req.body.name),
      city: capitalizeString(req.body.city),
      country: capitalizeString(req.body.country),
      description: req.body.description,
      type: req.body.type,
      adultCount: parseInt(req.body.adultCount),
      childCount: parseInt(req.body.childCount),
      facilities: req.body.facilities,
      pricePerNight: parseInt(req.body.pricePerNight),
      starRating: parseInt(req.body.starRating),
      imageUrls: imageUrls,
      lastUpdated: new Date(),
      bookings: [],
    });

    const data = await newHotel.save();

    nodeCache.del("hotels");

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Failed to add new hotel. Please try again later." });
  }
};

const updateMyHotel = async (req, res) => {
  const hotelId = req.params.hotelId;
  // console.log(req.body);
  let updatedHotel = {};
  if (req.files) {
    const newImageUrls = await Promise.all(
      req.files.map(async (file) => {
        return await uploadCloudinary(file.path);
      })
    );
    const allImageUrls = [...newImageUrls, ...(req.body.imageUrls || [])];

    updatedHotel = {
      $set: {
        name: capitalizeString(req.body.name),
        city: capitalizeString(req.body.city),
        country: capitalizeString(req.body.country),
        description: req.body.description,
        type: req.body.type,
        adultCount: parseInt(req.body.adultCount),
        childCount: parseInt(req.body.childCount),
        facilities: req.body.facilities,
        pricePerNight: parseInt(req.body.pricePerNight),
        lastUpdated: new Date(),
        imageUrls: allImageUrls,
      },
    };
  } else {
    updatedHotel = {
      $set: {
        name: capitalizeString(req.body.name),
        city: capitalizeString(req.body.city),
        country: capitalizeString(req.body.country),
        description: req.body.description,
        type: req.body.type,
        adultCount: parseInt(req.body.adultCount),
        childCount: parseInt(req.body.childCount),
        facilities: req.body.facilities,
        pricePerNight: parseInt(req.body.pricePerNight),
        lastUpdated: new Date(),
      },
    };
  }

  try {
    const hotel = await Hotel.findByIdAndUpdate(hotelId, updatedHotel, {
      new: true,
    });

    if (!hotel) {
      console.log("Hotel not found.");
      return res.status(404).json({ message: "Hotel not found." });
    }
    nodeCache.del("hotels");
    console.log(`Hotel updated: ${hotel.name}`);
    res.status(200).json({ hotel, message: "Hotel updated successfully." });
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ message: "Error updating hotel." });
  }
};

const deleteMyHotel = async (req, res) => {
  const hotelId = req.params.hotelId;
  console.log("hotelid", hotelId);
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      res.status(404).json({ message: "Hotel does not exist." });
    }
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    // Extract the public ID from the secure URL
    const publicIds = extractPublicIds(deletedHotel.imageUrls);
    deleteArrayOfImagesFromCloudinary(publicIds);
    // console.log(deletedHotel);
    nodeCache.del("hotels");
    res.status(200).json({ message: "Successfully deleted hotel." });
  } catch (error) {
    res.status(404).json({
      message: "Unable to delete this hotel, Please try again later.",
    });
  }
};

const getMyHotels = async (req, res) => {
  const { userId } = req.user;
  // const queryParameter = { user: `${userId}` };
  try {
    const data = await Hotel.find({
      userId: `${userId}`,
    }).sort({ lastUpdated: -1 });
    if (!data) return res.status(404).json({ message: "No hotels found" });
    res.status(200).json({ hotels: data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  addMyHotel,
  updateMyHotel,
  deleteMyHotel,
  getMyHotels,
};
