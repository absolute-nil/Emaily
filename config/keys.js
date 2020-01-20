

//figure out which credentials to use

if(process.env.NODE_ENV==='production'){
  //we are in production env
  module.exports = require("./prod")
}else{
  //we are in dev mode
  module.exports= require("./dev")
}