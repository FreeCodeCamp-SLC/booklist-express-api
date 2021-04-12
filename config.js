require('dotenv').config({ path: `${__dirname}/.env` });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  SERVER_PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',

  DB_CLIENT: process.env.DB_CLIENT || 'pg',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USERNAME: process.env.DB_USERNAME || 'postgres',
  DB_DATABASE: process.env.DB_DATABASE || 'booklist',
  DB_TEST_DATABASE: process.env.DB_TEST_DATABASE || 'booklist_test',
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT || 5432,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
};
