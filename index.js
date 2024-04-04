const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config()
const app = express();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
  console.log('DB connected')
})
.catch((error)=>{
  console.log(error);
});

app.use(express.urlencoded({ extended: true }));   
//Note:- If we do {extended:false} here then we can't able to get data from 
// frontend "<form> <input>  </form>" field
 
app.set('view engine', 'ejs');

//Using Router here
const hotelRouter = require('./routes/hotelRoutes');
app.use(hotelRouter);

app.listen(process.env.PORT, ()=> {
  console.log(`server is running at port no. ${process.env.PORT}`);
});
