//jshint esversion:6
const express = require("express");
require("./services/passport")
 
const PORT = process.env.PORT || 5000;
const app = express();

//passing the express app to the routes or you can say adding the routes to the express server
require("./routes/authRoutes")(app);

app.listen(PORT, function() {
  console.log("listening on port :" + PORT);
});
