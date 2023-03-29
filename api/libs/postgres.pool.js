const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'fabi',
  password: 'admin123',
  database: 'my_lab'
});

module.exports = pool;

