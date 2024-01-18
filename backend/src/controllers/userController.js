const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  // console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User with this email id already exists.");
    }

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    await newUser.save();
    const tokenPayload = {
      userId: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token: token });
    // Set a cookie using js-cookie
    // Cookies.set("jwt", token, { expires: 1 });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send("Error during user registration");
  }
};

const userLogin = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send("User not found. Please check your email and try again.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid password. Please try again." });
    }

    const tokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token: token });
  } catch (error) {
    console.error("Error during user login:", error);
  }
};

const userLogout = async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { userLogin, userSignup, userLogout };
