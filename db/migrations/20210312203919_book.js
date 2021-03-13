
exports.up = function(knex) {
  return knex.schema.createTable('books', table => {
    table.increments('book_id').unique.notNullable
    table.string('user_id').notNullable
    table.integer('list_id').notNullable
    table.string('author', 255).notNullable
    table.string('title', 255).notNullable
    table.string('image_url')
    table.integer('pages')
    table.integer('reading_status_id')
    table.dateTime('date_started')
    table.dateTime('date_finished')
		table.dateTime('created_on').defaultTo(knex.fn.now())
		table.dateTime('modified_on').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('books');
};
