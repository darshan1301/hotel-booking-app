const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./src/.env" });
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoute");
const hotelRouter = require("./routes/hotelRoute");
const bookingRouter = require("./routes/bookingRoute");
const myHotelRouter = require("./routes/myHotelRoute");
const { connectMongoDB } = require("./db");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const PORT = process.env.PORT || 8000;
connectMongoDB();

const uploadDir = "src/my-uploads";

// Ensure the destination folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//// ROUTES

app.use("/user", userRouter);
app.use("/api", hotelRouter);
app.use("/myhotels", myHotelRouter);
app.use("/bookings", bookingRouter);

app.get("/", (req, res) => {
  res.send("hello sir, api is working");
  // console.log("HEALTHY");
});

app.listen(PORT, () => {
  console.log(`server is running on localhost:${PORT}`);
});
