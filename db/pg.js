const { Pool } = require('pg');
const environment = process.env.NODE_ENV || 'development';

const { connection } = require('./pgDbConnections')[environment];

const pool = new Pool(connection);

module.exports = pool;
