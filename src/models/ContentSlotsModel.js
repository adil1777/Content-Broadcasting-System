const pool = require("../config/database");

const createContentSlotsTable = async () => {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
    CREATE TABLE IF NOT EXISTS content_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `);

  } finally {
    connection.release();
  }
};

const initSlots = async () => {
  await createContentSlotsTable();
};

module.exports = {
 initSlots
};