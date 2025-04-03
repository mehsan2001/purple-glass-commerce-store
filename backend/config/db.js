
const mysql = require('mysql2');
require('dotenv').config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'purpleglass_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert to promise-based API
const promisePool = pool.promise();

// Test the connection
const testConnection = async () => {
  try {
    const [rows] = await promisePool.query('SELECT 1');
    console.log('Database connection established successfully');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

module.exports = {
  pool: promisePool,
  testConnection
};
