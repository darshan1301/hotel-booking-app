const express = require("express");

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("hello sir, api's been hit");
});

app.listen(PORT, () => {
  console.log(`server is running on localhost:${PORT}`);
});
