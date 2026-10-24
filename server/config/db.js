const mysql = require('mysql2/promise');
const fs = require('node:fs');
require('dotenv').config();

const requiredEnvironmentVariable = (name) => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const ssl = process.env.DB_SSL === 'true'
  ? {
      rejectUnauthorized: true,
      ...(process.env.DB_SSL_CA
        ? { ca: fs.readFileSync(process.env.DB_SSL_CA, 'utf8') }
        : {}),
    }
  : undefined;

const pool = mysql.createPool({
  host: requiredEnvironmentVariable('DB_HOST'),
  port: Number(process.env.DB_PORT || 3306),
  user: requiredEnvironmentVariable('DB_USER'),
  password: requiredEnvironmentVariable('DB_PASSWORD'),
  database: requiredEnvironmentVariable('DB_NAME'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl,
});

async function testConnection() {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
    return true;
  } finally {
    connection.release();
  }
}

module.exports = { pool, testConnection };
