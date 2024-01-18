const mongoose = require("mongoose");

async function connectMongoDB() {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/bookingApp"
    );
    console.log("Connected to mongoDB.");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

module.exports = { connectMongoDB };
