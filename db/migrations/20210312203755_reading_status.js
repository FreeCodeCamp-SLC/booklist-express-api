
exports.up = function(knex) {
  return knex.schema.createTable('readingStatus', table => {
    table.increments('reading_status_id').unique().notNullable()
    table.string('name', 255).notNullable()
		table.datetime('created_on').defaultTo(knex.fn.now())
		table.datetime('modified_on').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('readingStatus');
};
