const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const mongoose = require("mongoose");
const keys = require("../config/keys");

//to fetch from mongoose and not load in data we will use :
const User = mongoose.model("user");

//we serialize user to give user a identifing token wehn the user logs in
passport.serializeUser((user, done) => {
  //user id is the identifing token of our user. we dont use google id becausue user may have logged in through facebook
  //we dont exoect any errors so we pass null to the done callback
  done(null, user.id);
});

//we deserialize user to take the token and converts it into a user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//below is the strategy passport is going to use
passport.use(
  new GoogleStrategy(
    {
      //sent to google for verification of our app
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //callback is the url google will redirect us to after we are authenticated this should back
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    //
    (accessToken, refreshToken, profile, done) => {
      //profile contains the unique Id that we will need to identify the user

      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          //user already exists
          done(null, existingUser);
        } else {
          //user does not exist
          //below we create a new instance of a user.. to save it we use .save
          new User({ googleID: profile.id })
            .save()
            //done is called when we have done some work in passport
            .then(user => done(null, user));
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      //sent to facebook for verification of our app
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      //callback is the url facebook will redirect us to after we are authenticated this should back
      callbackURL: "/auth/facebook/callback"
    },
    //
    (accessToken, refreshToken, profile, done) => {
      //profile contains the unique Id that we will need to identify the user

      User.findOne({ facebookID: profile.id }).then(existingUser => {
        if (existingUser) {
          //user already exists
          done(null, existingUser);
        } else {
          //user does not exist
          //below we create a new instance of a user.. to save it we use .save
          new User({ facebookID: profile.id })
            .save()
            //done is called when we have done some work in passport
            .then(user => done(null, user));
        }
      });
    }
  )
);
