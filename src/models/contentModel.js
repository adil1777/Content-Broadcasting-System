const pool = require("../config/database");

const createContentTable = async () => {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS content (
        id INT AUTO_INCREMENT PRIMARY KEY,

        title VARCHAR(255) NOT NULL,
        description TEXT,
        subject VARCHAR(50) NOT NULL,

        file_path VARCHAR(255) NOT NULL,
        file_type VARCHAR(50),
        file_size INT,

        uploaded_by INT NOT NULL,

        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        rejection_reason TEXT,

        approved_by INT,
        approved_at TIMESTAMP NULL,

        start_time DATETIME,
        end_time DATETIME,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (uploaded_by) REFERENCES users(id)
          ON DELETE CASCADE,

        FOREIGN KEY (approved_by) REFERENCES users(id)
          ON DELETE SET NULL
      )
    `);

    // safer index creation
    await connection.query(`
      CREATE INDEX  idx_uploaded_by ON content(uploaded_by)
    `);

    await connection.query(`
      CREATE INDEX idx_status ON content(status)
    `);

    // 🔥 important combined index
    await connection.query(`
      CREATE INDEX idx_status_uploaded 
      ON content(status, uploaded_by)
    `);

  } finally {
    connection.release();
  }
};

const initContents = async () => {
  await createContentTable();
};

