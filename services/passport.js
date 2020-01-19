const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");
//below is the strategy passport is going to use
passport.use(
    new GoogleStrategy(
      {
        //sent to google for verification of our app
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        //callback is the url google will redirect us to after we are authenticated this should back 
        callbackURL: "/auth/google/callback"
      },
      //
      (accessToken,refreshToken,profile, done) => {
        console.log(accessToken);
      }
    )
  );
  