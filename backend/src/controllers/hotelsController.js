const mongoose = require("mongoose");
const Hotel = require("./../models/hotelModel");
const NodeCache = require("node-cache");

const nodeCache = new NodeCache({
  stdTTL: 60 * 60 * 24,
});

const getHotels = async (req, res) => {
  let hotels;
  if (nodeCache.has("hotels")) {
    return res.status(200).json({ data: JSON.parse(nodeCache.get("hotels")) });
  } else {
    try {
      const data = await Hotel.find().sort({ lastUpdated: -1 });
      nodeCache.set("hotels", JSON.stringify(data));
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "No hotels found" });
    }
  }
};

const getHotelDetails = async (req, res) => {
  const hotelId = req.params.hotelId;
  try {
    const data = await Hotel.findById(hotelId);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Hotel Not Found" });
  }
};

const getSearchHotels = async (req, res) => {
  // console.log("GET SEARCH HOTELS");
  // console.log(req.query);
  const query = queryConstructor(req.query);
  // console.log(query);
  try {
    let sortingOptions = {};

    switch (req.query.sortingOptions) {
      case "starRating":
        sortingOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortingOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortingOptions = { pricePerNight: -1 };
        break;
      default:
        sortingOptions = null;
    }

    const data = await Hotel.find(query).sort(sortingOptions);
    // console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ message: "No hotel found!" });
  }
};

const queryConstructor = (query) => {
  let createQuery = {};

  if (query.destination) {
    createQuery.$or = [
      { city: new RegExp(query.destination, "i") },
      { country: new RegExp(query.destination, "i") },
    ];
  }
  if (query.adultCount) {
    createQuery.adultCount = { $gte: parseInt(query.adultCount) };
  }
  if (query.childCount) {
    createQuery.childCount = { $gte: parseInt(query.childCount) };
  }
  if (query.stars) {
    createQuery.starRating = { $in: parseInt(query.stars) };
  }
  if (query.facilities) {
    createQuery.facilities = {
      $all: Array.isArray(query.facilities)
        ? query.facilities
        : [query.facilities],
    };
  }
  if (query.types) {
    createQuery.type = {
      $in: Array.isArray(query.types) ? query.types : [query.types],
    };
  }
  if (query.maxPrice) {
    createQuery.pricePerNight = { $lte: parseInt(query.maxPrice) };
  }
  return createQuery;
};

module.exports = {
  getHotels,
  getSearchHotels,
  getHotelDetails,
};
