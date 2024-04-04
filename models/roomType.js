const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  roomType: String,
  roomName: String,
  roomId: String,
  personCount: Number  // Include personCount field
});
const RoomType = mongoose.model('roomType', roomTypeSchema);
module.exports = RoomType;