const express = require("express");
const {
  addMyHotel,
  updateMyHotel,
  deleteMyHotel,
  getMyHotels,
} = require("../controllers/myHotelsController");
const { isAuthenticated } = require("../authentication/authentication");
const upload = require("../middlewares/multer.middleware");
const {
  checkHotelOwnership,
} = require("../middlewares/checkHotelOwnership.middleware");

const router = express.Router();

/////Auth Routes
router.get("/", isAuthenticated, getMyHotels);

router.patch(
  "/:hotelId",
  isAuthenticated,
  checkHotelOwnership,
  upload.array("photos", 4),
  updateMyHotel
); //gd

router.delete("/:hotelId", isAuthenticated, checkHotelOwnership, deleteMyHotel); //gd

router.post(
  "/addHotel",
  isAuthenticated,
  upload.array("photos", 4),
  addMyHotel
); //gd

module.exports = router;

//gd == GOOD
