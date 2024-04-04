const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name:String,
  address:{
    fullAddress:String,
    state:String,
    city:String
  },
  description:String,
  hotelId:String,
  Image:[String], 
  nameSearch:String
});

const hotelModel = mongoose.model('hotel', hotelSchema)
module.exports = hotelModel;