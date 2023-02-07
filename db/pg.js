const { Pool } = require('pg');
const { parse } = require('pg-connection-string');

// const environment = process.env.NODE_ENV || 'development';

// const { connection } = require('./pgDbConnections')[environment];

const pgconfig = parse(process.env.DATABASE_URL);

pgconfig.ssl = { rejectUnauthorized: false };

const pool = new Pool({
  client: 'pg',
  connection: pgconfig,
});

console.log('pool', pool);

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

module.exports = pool;
