const passport = require("passport");

//wrap around arrow function to make it availabe in the index.js express server
module.exports = app => {
  //the route that the user when visits will kick off the passport google authentication
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      //scope is what we need from the users account
      scope: ["profile", "email"]
    })
  );
  //the callback request after authentication
  app.get("/auth/google/calllback", passport.authenticate("google"));
};
