
// Database connection configuration
const mysql = require('mysql2');

// Create a connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'your-hostinger-mysql-host',
  user: process.env.DB_USER || 'your-hostinger-username',
  password: process.env.DB_PASSWORD || 'your-hostinger-password',
  database: process.env.DB_NAME || 'your-database-name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

module.exports = promisePool;
