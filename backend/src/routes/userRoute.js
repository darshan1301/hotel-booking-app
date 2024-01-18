const express = require("express");
const {
  userLogin,
  userSignup,
  userLogout,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.post("/logout", userLogout);

module.exports = router;
