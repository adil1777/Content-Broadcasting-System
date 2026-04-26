const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const morgan= require('morgan');
const connectDB = require("../src/config/dbConection")

dotenv.config();
const app = express();
app.use(cors());

//Mongodb Connection
connectDB();

//middleware 
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


// Routes for testing
app.get("/", async (req, res) => {
  try {
    res.send("Hello Word");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


//Routes



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`.bgGreen.white);
});