// const environment = process.env.NODE_ENV || 'development';
// const config = require('./knexfile.js')[environment];
const config = require('./knexfile.js').production;

module.exports = require('knex')(config);
