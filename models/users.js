const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  userName:String,
  userId:String,
  password:String,
  profilePic:String,
  address:String,
  confirmPassword:String,
  email:String
});

const userModel = mongoose.model('users', usersSchema);
module.exports = userModel;