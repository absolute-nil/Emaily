//jshint esversion:6
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send({ Hi: "there" });
});

app.listen(PORT, function() {
  console.log("listening on port :" + PORT);
});
