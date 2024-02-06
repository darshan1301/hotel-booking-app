const express = require("express");
const {
  userLogin,
  userSignup,
  userLogout,
  getUserInfo,
} = require("../controllers/userController");
const { isAuthenticated } = require("../authentication/authentication");

const router = express.Router();

router.post("/login", userLogin); //gd
router.post("/signup", userSignup); //gd
router.get("/me", isAuthenticated, getUserInfo); //gd
// router.get("/logout", userLogout);

module.exports = router;
