const { DB_HOST, DB_USERNAME, DB_DATABASE, DB_TEST_DATABASE, DB_PASSWORD, DB_PORT } = require('../config');

module.exports = {
	test: {
		connection: {
			host: DB_HOST,
			database: DB_TEST_DATABASE,
			port: DB_PORT,
			user: DB_USERNAME,
			password: DB_PASSWORD
		}
	},
	development: {
		connection: {
			host: DB_HOST,
			database: DB_DATABASE,
			port: DB_PORT,
			user: DB_USERNAME,
			password: DB_PASSWORD
		}
	},
	staging: {
		connection: {
			host: DB_HOST,
			database: DB_DATABASE,
			port: DB_PORT,
			user: DB_USERNAME,
			password: DB_PASSWORD
		}
	},
	production: {
		connection: {
			host: DB_HOST,
			database: DB_DATABASE,
			port: DB_PORT,
			user: DB_USERNAME,
			password: DB_PASSWORD
		}
	}
}

