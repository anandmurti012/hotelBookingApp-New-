const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
// const multer = require('multer');
const Hotel = require('../models/hotel');
const HotelRoom = require('../models/hotelRooms');
const RoomType = require('../models/roomType');
const Users = require('../models/users');
router.use(bodyParser.json());


// Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/') // Set your destination folder where files will be saved
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname) // Use the original file name
//   }
// });

//
 
router.use(session({
  secret: 'anandMurti',
  resave: false,
  saveUninitialized: false
}));

router.get('/', (req, res) => {
  res.render('hotels/home', { page: 'Home' });
});

router.get('/hotelIndex', async (req, res) => {
  const mHotel = await Hotel.find();
  res.render('hotels/hotelIndex', { mHotel, page: 'Hotel Index' });
});

router.get('/adminPanel', async (req, res) => {
  const mHotel = await Hotel.find();

  res.render('hotels/adminPanel', { mHotel, page: 'Admin Panel' });
});

//Login system -Users
router.post('/userLogin', async (req, res) => {
  const userData = req.body.users; // Extract the user data from req.body.users
  const mUsers = new Users({
    userName: userData.userName,
    address: userData.address,
    email: userData.email,
    password: userData.password,
    confirmPassword:userData.cPassword
  });
  await mUsers.save();
  res.send('user successfully registered')
});

var globalUserId;
router.post('/login', async(req, res)=> {
const { userId, password} = req.body;
try {
  const User = await Users.findOne({uaerId, password});
  if(user === null){
    return res.status(401).send("Invalid userId or password")
  }
  globalUserId = User.userId;

} catch (error) {
  
}

});

const saveHotelRoom = async (fRoomId, fPrice, fRoomNumbers, fImage) => {
  try {
    const mRoomData = await RoomType.findOne({ roomId: fRoomId });
    console.log("roomdata->", mRoomData);
    const mHotelId = currentAdminHotel.hotelId;

    console.log('mHotel Id -> ', mHotelId);
    const mHotelRoomData = await HotelRoom.findOne({ hotelId: mHotelId });

    //data available
    if (mHotelRoomData != null) {
      const existingRoomIndex = mHotelRoomData.rooms.findIndex(
        (room) => room.roomId === fRoomId
      );
      if (existingRoomIndex !== -1) {
        mHotelRoomData.rooms[existingRoomIndex] = {
          roomId: mRoomData.roomId,
          roomName: mRoomData.roomName,
          personCount: mRoomData.personCount,
          price: fPrice,
          roomNumbers: fRoomNumbers,
          image: fImage
        };
      } else {
        mHotelRoomData.rooms.push({
          roomId: mRoomData.roomId,
          roomName: mRoomData.roomName,
          personCount: mRoomData.personCount,
          price: fPrice,
          roomNumbers: fRoomNumbers,
          image: fImage
        });
      }
      await mHotelRoomData.save();
    } else {
      const mHotelRoom = new HotelRoom({
        hotelId: mHotelId,
        rooms: [
          {
            roomId: mRoomData.roomId,
            roomName: mRoomData.roomName,
            personCount: mRoomData.personCount,
            price: fPrice,
            roomNumbers: fRoomNumbers,
            image: fImage
          },
        ],
      });
      await mHotelRoom.save();
      console.log("Hotel rooms saved successfully");
    }
  } catch (error) {
    console.error("Error saving Hotel room:", error);
  }
}
var currentAdminHotel
router.get('/admin/:hotelId', async (req, res) => {
  const mHotelView = await Hotel.findOne({ hotelId: req.params.hotelId });
  currentAdminHotel = mHotelView;
  const mRoomType = await RoomType.find();
  console.log("hotel details->", currentAdminHotel.hotelId);
  const mHotelRoom = await HotelRoom.findOne({hotelId:req.params.hotelId});
  res.render('hotels/adminViewHotel', { mHotelView, mHotelRoom, mRoomType, page: mHotelView.name });
});
router.post('/saveRoom', (req, res) => {
  const { roomId, price, roomNumbers, image } = req.body;
  console.log("saveRoom Info ->", req.body);

  saveHotelRoom(roomId, price, roomNumbers, image);
  // Send a response back to the frontend
  res.json({ message: 'Data received successfully!', roomId, price, roomNumbers, image });
});

function generateSixDigitNumber() {
  return Math.floor(Math.random() * 900000) + 100000;
}

router.post("/addHotels", async (req, res) => {
  try {
    const randomNumber = generateSixDigitNumber();
    console.log("Generated hotelId:", "hotel" + randomNumber);

    req.body.hotel.hotelId = "hotel" + randomNumber;
    req.body.hotel.nameSearch = req.body.hotel.name.toLowerCase();

    const addHotels = new Hotel(req.body.hotel);
    currentHotel = addHotels;
    console.log("addHotels-> ", addHotels);
    await addHotels.save();
    // res.send('data saved');
    res.redirect('/adminPanel');
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

var currentHotel;
router.get('/hotels/:hotelId', async (req, res) => {
  const hotelData = await Hotel.findOne({ hotelId: req.params.hotelId });
  currentHotel = hotelData;
  const mHotelRooms = await HotelRoom.findOne({hotelId:req.params.hotelId});
  console.log("hotelData->", hotelData);
  console.log("hotelRoom->", mHotelRooms);
  res.render('hotels/userViewHotel', { hotelData, mHotelRooms, page: hotelData.name });
});

router.post('/addRooms', async (req, res) => {
  const mRoomType = new RoomType(req.body.room);
  console.log("saved rooms->", mRoomType);
  await mRoomType.save();
  res.send('room Saved successfully');
});


module.exports = router;