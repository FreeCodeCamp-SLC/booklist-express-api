
exports.up = function(knex) {
  return knex.schema.createTable('reading_status', table => {
    table.increments('reading_status_id').unique().notNullable()
    table.string('name', 255).notNullable()
		table.datetime('created_on').defaultTo(knex.fn.now())
		table.datetime('modified_on').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reading_status');
};
