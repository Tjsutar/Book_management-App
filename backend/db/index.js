const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',          // Database host
  user: 'root',           // Database username
  password: 'root',       // Database password
  database: 'book_management',  // Database name
  waitForConnections: true,    // Wait for connections to become available
  connectionLimit: 10,         // Maximum number of connections in pool
  queueLimit: 0                // Number of connections requests to queue before returning an error
});

// Create a promise-based pool
const promisePool = pool.promise();

module.exports = promisePool;
