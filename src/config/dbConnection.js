const pool = require("./database");
const colors = require("colors");

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully".bgGreen.white);
    connection.release();
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;