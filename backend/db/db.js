const { Pool } = require('pg');
const dbPass = process.env.DB_PASS;



const pool = new Pool({
  user: 'labber',
  password: dbPass,
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'final_project'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};