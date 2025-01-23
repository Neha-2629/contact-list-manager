require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// pool.query("SELECT NOW()", (err, res) => {
//   if (err) {
//     console.error("Database connection error:", err.message);
//   } else {
//     console.log("Database connected:", res.rows);
//   }
//   //pool.end();
// });

module.exports = pool;

