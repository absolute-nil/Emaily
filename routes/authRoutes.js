const passport = require("passport");

//wrap around arrow function to make it availabe in the index.js express server
module.exports = app => {
  //the route that the user when visits will kick off the passport google/facebook authentication
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      //scope is what we need from the users account
      scope: ["profile", "email"]
    })
  );
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      //scope is what we need from the users account
      scope: ["profile", "email"]
    })
  );
  //the callback request after authentication
  app.get("/auth/google/callback", passport.authenticate("google"));
  app.get("/auth/facebook/callback", passport.authenticate("facebook"));

  //get access to the current user
  app.get("/api/currentUser", (req, res) => {
    res.send(req.user);
  });

  //to logout the user
  app.get("/api/logout",(req,res)=>{
    req.logout();
    res.send(req.user);
  });
};
