const {
  DB_CLIENT, DB_HOST, DB_USERNAME, DB_DATABASE, DB_TEST_DATABASE, DB_PASSWORD, DB_PORT,
} = require('../config');

module.exports = {
  test: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      database: DB_TEST_DATABASE,
      port: DB_PORT,
      user: DB_USERNAME,
      password: DB_PASSWORD,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds/test`,
    },
    log: {
      warn(message) {
      },
      error(message) {
      },
      deprecate(message) {
      },
      debug(message) {
      },
    },
  },
  development: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      database: DB_DATABASE,
      port: DB_PORT,
      user: DB_USERNAME,
      password: DB_PASSWORD,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds/development`,
    },
  },
  staging: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      database: DB_DATABASE,
      port: DB_PORT,
      user: DB_USERNAME,
      password: DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 20,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      database: DB_DATABASE,
      port: DB_PORT,
      user: DB_USERNAME,
      password: DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds/production`,
    },
  },
};
