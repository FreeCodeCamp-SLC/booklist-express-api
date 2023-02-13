// const environment = process.env.NODE_ENV || 'development';
// const config = require('./knexfile.js')[environment];
const config = require('./knexfile.js').production;
module.exports = require('knex')(config);

// module.exports = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false },
//   },
//   migrations: {
//     directory: `${__dirname}/migrations`,
//   },
//   seeds: {
//     directory: `${__dirname}/seeds/production`,
//   },
// });
