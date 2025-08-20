"use strict";
let express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("/index");
});

app.listen(PORT, (req, res) => {
  console.log(`Your app is now running on port: ${PORT}`);
});
