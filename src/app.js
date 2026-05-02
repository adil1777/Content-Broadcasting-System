const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const morgan= require('morgan');
const configServer = require("./config/configServer");
const pool = require("../src/config/database");

dotenv.config();
const app = express();
app.use(cors());


//MySQL  Connection
pool.getConnection();

const {initUsers} = require("../src/models/userModel");
const  {initContents} = require("../src/models/contentModel");
const  {initSlots} =  require("../src/models/contentSlotsModel");
const  {initSchedules} = require("../src/models/contentScheduleModel");


//middleware 
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// // Initialize tables
const initializeTables = async () => {
   await initUsers();
   await initContents();
   await initSlots();
   await initSchedules();
  
};

initializeTables().then(() => {
  console.log(`Database tables initialized`.bgGreen.bgWhite);
}).catch((error) => {
  console.error(`Error initializing database tables:, ${error}`.bgRed.bgWhite);
});



// Routes for testing
app.get("/", async (req, res) => {
  try {
    res.send("Hello Word");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


//Routes
app.use("/api/v1", require("./auths/auth.routers"));




const PORT = configServer.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`.bgGreen.white);
});