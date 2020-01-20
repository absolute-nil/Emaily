//jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
//passport requires model so we need mongoose require first in order
require("./models/User");
require("./services/passport");

//connecting to mongoose remote
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

//making use of cookies and passport
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//tell passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

//passing the express app to the routes or you can say adding the routes to the express server
require("./routes/authRoutes")(app);

//dynamic port number of heroku and our development port specified
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("listening on port :" + PORT);
});
