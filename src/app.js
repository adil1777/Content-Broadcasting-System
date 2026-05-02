const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const morgan= require('morgan');
const configServer = require("./config/configServer");
const connectDB = require("./config/dbConnection");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// HEALTH CHECK API
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
const startServer = async () => {
  await connectDB(); // ✅ DB first

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgGreen.white);
  });
};

startServer();