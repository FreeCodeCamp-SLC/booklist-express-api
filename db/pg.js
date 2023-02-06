const { Pool } = require('pg');

const environment = process.env.NODE_ENV || 'development';

// const { connection } = require('./pgDbConnections')[environment];

// const pool = new Pool(connection);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
