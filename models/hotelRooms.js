const mongoose = require('mongoose');

const hotelRoomScehma = new mongoose.Schema({
  hotelId:String,
  rooms:[{
    roomId:String,
    roomName:String,
    personCount:Number,
    price:Number,
    roomNumbers:Number,
    image:[String],
    bookings:[
      {
        dateId:String,
        bookingId:String,
        userId:String,
        bookingStatus:String,
        personCount:Number
      }
    ]
  }]
});

const HotelRoom = mongoose.model('hotelRoom', hotelRoomScehma);
module.exports = HotelRoom;