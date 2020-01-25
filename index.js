//jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');
const keys = require("./config/keys");
//passport requires model so we need mongoose require first in order
require("./models/User");
require(".//models/Survey");
require("./services/passport");

//connecting to mongoose remote
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.use(bodyParser.json());

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
require("./routes/billingRoutes")(app);

//for production
if(process.env.NODE_ENV==='production'){
  //express will server up main.css and js file
  app.use(express.static('client/build'));

  //express will server up index.html if it does not recognize path
  const path = require('path');
  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname, 'client' ,'build' ,'index.html'));
  });

}

//dynamic port number of heroku and our development port specified
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("listening on port :" + PORT);
});
