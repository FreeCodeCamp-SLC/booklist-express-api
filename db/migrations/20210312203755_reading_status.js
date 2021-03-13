
exports.up = function(knex) {
  return knex.schema.createTable('readingStatus', table => {
    table.increments('reading_status_id').unique.notNullable
    table.string('user_id').notNullable
    table.string('name', 255).notNullable
    table.integer('year')
		table.dateTime('created_on').defaultTo(knex.fn.now())
		table.dateTime('modified_on').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('readingStatus');
};
