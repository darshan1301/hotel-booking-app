const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  // console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email id already exists." });
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
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: null,
    });
    console.log("signed in");

    res.status(200).json({ token: token });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send("Error during user registration");
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
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
        .send({ message: "Invalid password. Please try again." });
    }

    const tokenPayload = {
      userId: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: null,
    });
    console.log("Logged In");

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error during user login:", error.message);
  }
};

const getUserInfo = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId).select("-password");

    // console.log(user);
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ message: "User not found!" });
  }
};

// const userLogout = async (req, res) => {
//   res.status(200).json({ message: "Logout successful" });
// };

module.exports = { userLogin, userSignup, getUserInfo };
