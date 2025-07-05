// db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://myuser:MySecurePassword123!@dpg-xyzabcd1234abcdabcd-a.frankfurt-postgres.render.com:5432/render',
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;