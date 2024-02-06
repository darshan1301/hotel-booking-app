const mongoose = require("mongoose");
require("dotenv").config();

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to mongoDB.");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

module.exports = { connectMongoDB };
