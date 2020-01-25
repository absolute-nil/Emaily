const mongoose = require('mongoose');
const {Schema} = mongoose;

const reciepientSchema = new Schema({
    email: String,
    responded: {type:Boolean, default:false}
});

module.exports = reciepientSchema;