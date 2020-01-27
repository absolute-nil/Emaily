const mongoose = require('mongoose');
const {Schema} = mongoose;
//this is a sub document of the survey document
const reciepientSchema = new Schema({
    email: String,
    responded: {type:Boolean, default:false}
});

module.exports = reciepientSchema;