const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./src/.env" });
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoute");
const { connectMongoDB } = require("./db");

const app = express();
const PORT = process.env.PORT;
connectMongoDB();

app.use(bodyParser.json());
app.use(cors());

//// ROUTES

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("hello sir, api's been hit");
  console.log(process.env);
});

app.listen(PORT, () => {
  console.log(`server is running on localhost:${PORT}`);
});
