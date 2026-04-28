// const createContentTable = async () => {
//   const connection = await pool.getConnection();
//   try {
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS content (
//         id INT AUTO_INCREMENT PRIMARY KEY,

//         title VARCHAR(255) NOT NULL,
//         description TEXT,
//         subject VARCHAR(50) NOT NULL,

//         file_path VARCHAR(255) NOT NULL,
//         file_type VARCHAR(50),
//         file_size INT,

//         uploaded_by INT NOT NULL,

//         status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
//         rejection_reason TEXT,

//         approved_by INT,
//         approved_at TIMESTAMP NULL,

//         start_time DATETIME,
//         end_time DATETIME,

//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

//         CONSTRAINT fk_uploaded_by
//           FOREIGN KEY (uploaded_by)
//           REFERENCES users(id)
//           ON DELETE CASCADE
//           ON UPDATE CASCADE,

//         CONSTRAINT fk_approved_by
//           FOREIGN KEY (approved_by)
//           REFERENCES users(id)
//           ON DELETE SET NULL
//           ON UPDATE CASCADE,

//         INDEX idx_uploaded_by (uploaded_by),
//         INDEX idx_approved_by (approved_by),
//         INDEX idx_status (status)
//       )
//     `);
//   } finally {
//     connection.release();
//   }
// };