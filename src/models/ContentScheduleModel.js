const pool = require("../config/database");

const createContentScheduleTable = async () => {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS content_schedule (
        id INT AUTO_INCREMENT PRIMARY KEY,

        content_id INT NOT NULL,
        slot_id INT NOT NULL,

        rotation_order INT NOT NULL,
        duration INT NOT NULL, -- minutes

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (content_id) REFERENCES content(id)
          ON DELETE CASCADE,

        FOREIGN KEY (slot_id) REFERENCES content_slots(id)
          ON DELETE CASCADE,

        INDEX idx_slot_id (slot_id),
        INDEX idx_content_id (content_id),

        UNIQUE KEY unique_slot_order (slot_id, rotation_order)
      )
    `);
  } finally {
    connection.release();
  }
};

const initSchedules = async () => {
  await createContentScheduleTable();
};

