exports.up = function (knex) {
	return knex.schema.createTable('user', table => {
		table.increments('user_id').unique.notNullable
		table.string('email', 70).unique.notNullable
		table.string('password', 255).notNullable
		table.dateTime('created_on').defaultTo(knex.fn.now())
		table.dateTime('modified_on').defaultTo(knex.fn.now())
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('user');
};
