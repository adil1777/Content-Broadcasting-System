const mysql = require("mysql2/promise");
const configServer = require("./configServer");

const pool = mysql.createPool({
  host: configServer.DB_HOST,
  user: configServer.DB_USER,
  password: configServer.DB_PASSWORD,
  database: configServer.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;